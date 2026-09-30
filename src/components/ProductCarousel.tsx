"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Shot {
  src: string;
  alt: string;
  /** Short line describing what this screen shows. */
  caption: string;
}

interface Props {
  shots: Shot[];
  /** Dwell time per slide, in ms. */
  interval?: number;
  /** Accessible name for the carousel region. */
  label: string;
}

export default function ProductCarousel({ shots, interval = 4200, label }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Remounts the progress bar so its CSS animation restarts on every slide.
  const [tick, setTick] = useState(0);
  const touchX = useRef<number | null>(null);

  const count = shots.length;
  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setTick((t) => t + 1);
    },
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setTimeout(() => go(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, count, interval, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const active = shots[index];
  const autoRunning = !reduced && !paused && count > 1;

  return (
    <div
      className="group/car relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Frame */}
      <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-500 group-hover/car:border-accent/35 group-hover/car:shadow-[0_0_40px_rgba(var(--accent-rgb),0.09)]">
        {/* Slides — every frame stays mounted so heights never jump. */}
        <div className="relative">
          {shots.map((s, i) => (
            <div
              key={s.src}
              className={`transition-opacity duration-700 motion-reduce:transition-none ${
                i === index
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={i === index ? s.alt : ""}
                className="h-auto w-full transition-transform duration-[1200ms] ease-out motion-reduce:transition-none group-hover/car:scale-[1.015]"
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}

          {/* Arrows — only once there is somewhere to go, and only on hover. */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className="absolute top-1/2 left-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-foreground/80 opacity-0 backdrop-blur transition-all duration-300 group-hover/car:opacity-100 hover:border-accent/50 hover:text-accent focus-visible:opacity-100"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className="absolute top-1/2 right-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-foreground/80 opacity-0 backdrop-blur transition-all duration-300 group-hover/car:opacity-100 hover:border-accent/50 hover:text-accent focus-visible:opacity-100"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Progress — restarts each slide, freezes while paused. */}
        {count > 1 && (
          <div className="h-[2px] w-full bg-white/8">
            <div
              key={tick}
              className="h-full bg-accent/70"
              style={
                autoRunning
                  ? { animation: `carousel-progress ${interval}ms linear forwards` }
                  : { width: reduced ? "100%" : undefined }
              }
            />
          </div>
        )}
      </div>

      {/* Caption + dots */}
      {count > 1 && (
        <div className="mt-4 flex items-start justify-between gap-4">
          <p
            className="min-h-[2.5rem] flex-1 text-sm leading-relaxed text-foreground/55"
            aria-live="polite"
          >
            {active.caption}
          </p>
          <div className="flex shrink-0 items-center gap-1.5 pt-1">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Screenshot ${i + 1}: ${s.caption}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {count === 1 && (
        <p className="mt-4 text-sm leading-relaxed text-foreground/55">{active.caption}</p>
      )}
    </div>
  );
}
