"use client";

import { useEffect, useRef } from "react";
import { Application, Graphics } from "pixi.js";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  alpha: number;
}

type ConnectionKey = string;
const connectionKey = (i: number, j: number): ConnectionKey =>
  i < j ? `${i}-${j}` : `${j}-${i}`;

export default function ParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let mouseX = -9999;
    let mouseY = -9999;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 200;
    const FADE_SPEED = 0.03;

    // Physics constants
    const GRAVITY_STRENGTH = 0.00008; // gentle pull between particles
    const REPULSION_DIST = 40;        // too-close repulsion range
    const REPULSION_STRENGTH = 0.5;
    const MOUSE_RADIUS = 180;
    const MOUSE_FORCE = 0.08;
    const DAMPING = 0.998;            // slight friction so it doesn't go crazy
    const MAX_SPEED = 2.5;
    const BOUNCE_DAMPING = 0.6;

    const particles: Particle[] = [];
    const lineOpacity = new Map<ConnectionKey, number>();

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    async function init() {
      const app = new Application();
      await app.init({
        resizeTo: container!,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      container!.appendChild(app.canvas as HTMLCanvasElement);

      const { width, height } = app.screen;

      // Create particles with varied mass
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const mass = Math.random() * 2 + 0.5;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          mass,
          radius: mass * 1.2 + 0.5,
          alpha: Math.random() * 0.4 + 0.3,
        });
      }

      const gfx = new Graphics();
      app.stage.addChild(gfx);

      app.ticker.add(() => {
        const w = app.screen.width;
        const h = app.screen.height;

        // --- Physics step ---
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          let fx = 0;
          let fy = 0;

          // Particle-particle forces
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < 1) continue; // avoid division by zero

            const nx = dx / dist;
            const ny = dy / dist;

            if (dist < REPULSION_DIST) {
              // Close-range repulsion (like soft-body collision)
              const overlap = REPULSION_DIST - dist;
              const force = overlap * REPULSION_STRENGTH;
              fx -= nx * force / a.mass;
              fy -= ny * force / a.mass;
              b.vx += nx * force / b.mass;
              b.vy += ny * force / b.mass;
            } else if (dist < CONNECTION_DIST) {
              // Gentle gravitational attraction when in connection range
              const force = GRAVITY_STRENGTH * a.mass * b.mass / (distSq + 100);
              fx += nx * force / a.mass;
              fy += ny * force / a.mass;
              b.vx -= nx * force / b.mass;
              b.vy -= ny * force / b.mass;
            }
          }

          // Mouse repulsion — particles flee from cursor
          const mdx = a.x - mouseX;
          const mdy = a.y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < MOUSE_RADIUS && mDist > 1) {
            const strength = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE;
            fx += (mdx / mDist) * strength;
            fy += (mdy / mDist) * strength;
          }

          a.vx += fx;
          a.vy += fy;
        }

        gfx.clear();

        // Update positions & draw particles
        for (const p of particles) {
          // Damping
          p.vx *= DAMPING;
          p.vy *= DAMPING;

          // Clamp speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > MAX_SPEED) {
            p.vx = (p.vx / speed) * MAX_SPEED;
            p.vy = (p.vy / speed) * MAX_SPEED;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Soft bounce off walls
          if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) * BOUNCE_DAMPING; }
          if (p.x > w) { p.x = w; p.vx = -Math.abs(p.vx) * BOUNCE_DAMPING; }
          if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) * BOUNCE_DAMPING; }
          if (p.y > h) { p.y = h; p.vy = -Math.abs(p.vy) * BOUNCE_DAMPING; }

          // Draw particle — glow effect for larger ones
          if (p.radius > 1.8) {
            gfx.circle(p.x, p.y, p.radius + 3);
            gfx.fill({ color: 0x00ff88, alpha: p.alpha * 0.15 });
          }
          gfx.circle(p.x, p.y, p.radius);
          gfx.fill({ color: 0x00ff88, alpha: p.alpha });
        }

        // --- Draw connections with smooth fade ---
        const activeKeys = new Set<ConnectionKey>();

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const key = connectionKey(i, j);

            if (dist < CONNECTION_DIST) {
              activeKeys.add(key);
              const target = (1 - dist / CONNECTION_DIST) * 0.35;
              const current = lineOpacity.get(key) ?? 0;
              const next = current + (target - current) * FADE_SPEED * 3;
              lineOpacity.set(key, next);

              if (next > 0.005) {
                gfx.moveTo(a.x, a.y);
                gfx.lineTo(b.x, b.y);
                gfx.stroke({ color: 0x00ff88, alpha: next, width: next > 0.15 ? 1.5 : 1 });
              }
            }
          }
        }

        // Fade out disconnected lines
        for (const [key, opacity] of lineOpacity.entries()) {
          if (!activeKeys.has(key)) {
            const next = opacity - FADE_SPEED;
            if (next <= 0.005) {
              lineOpacity.delete(key);
            } else {
              lineOpacity.set(key, next);
              const [iStr, jStr] = key.split("-");
              const a = particles[parseInt(iStr)];
              const b = particles[parseInt(jStr)];
              gfx.moveTo(a.x, a.y);
              gfx.lineTo(b.x, b.y);
              gfx.stroke({ color: 0x00ff88, alpha: next, width: 1 });
            }
          }
        }
      });

      return () => {
        app.destroy(true);
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      destroyed = true;
      cleanup?.();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
