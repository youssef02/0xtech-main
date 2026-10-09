"use client";

import { useEffect, useState } from "react";

type DriverState = "online" | "request" | "pickup" | "trip";

interface Step {
  src: string;
  alt: string;
  /** Short label used by the step dots. */
  label: string;
  /** Sentence shown under the phones while this step is active. */
  caption: string;
  /** What the driver phone shows while this rider step is active. */
  driver: DriverState;
  /** How long this step stays on screen, in milliseconds. */
  ms: number;
}

const STEPS: Step[] = [
  {
    src: "/products/taxy-step-1-home.png",
    ms: 2400,
    alt: "Taxy home map of Oujda with nearby taxis and a 'Where to?' sheet",
    label: "Home",
    caption: "Open the app — live map of Oujda, nearby taxis already on it.",
    driver: "online",
  },
  {
    src: "/products/taxy-step-2-ride.png",
    ms: 2800,
    alt: "Taxy ride selection showing Petit Taxi and VIP fares over a road-following route",
    label: "Choose a ride",
    caption:
      "Pick your ride — metered Petit Taxi at 8.79 MAD, or VIP at 16.07 MAD.",
    driver: "online",
  },
  {
    src: "/products/taxy-step-3-matching.png",
    ms: 2200,
    alt: "Taxy searching for a driver: 'Looking for nearby drivers...' over the map",
    label: "Matching",
    caption: "The request fans out to nearby drivers over WebSocket.",
    driver: "request",
  },
  {
    src: "/products/taxy-step-4-driver.png",
    ms: 2600,
    alt: "Taxy tracking screen with the assigned driver and arrival estimate",
    label: "Driver assigned",
    caption: "Matched — Rachid El Amrani, rated 5.0, is almost there.",
    driver: "pickup",
  },
  {
    src: "/products/taxy-step-5-trip.png",
    ms: 2800,
    alt: "Taxy ride in progress with ETA, distance and fare over the driving route",
    label: "In progress",
    caption:
      "Ride in progress — 7 min and 3.5 km along the OSRM road-following route.",
    driver: "trip",
  },
  {
    src: "/products/taxy-step-6-complete.png",
    ms: 2800,
    alt: "Taxy trip summary showing distance, duration and total fare",
    label: "Complete",
    caption: "Trip summary — 3.0 km, 5 min, 8.79 MAD, then rate the driver.",
    driver: "online",
  },
];

const DRIVER_FRAMES: Record<DriverState, { src: string; alt: string; label: string }> = {
  online: {
    src: "/products/taxy-drv-online.png",
    alt: "Taxy driver app, online in Oujda, waiting for ride requests",
    label: "Online · Oujda",
  },
  request: {
    src: "/products/taxy-drv-request.png",
    alt: "Taxy driver app: new ride request for MAD 8.79 with a 21-second countdown, decline or accept",
    label: "New request · 21s",
  },
  pickup: {
    src: "/products/taxy-drv-pickup.png",
    alt: "Taxy driver app: heading to pickup with an elapsed timer and an 'Arrived at Pickup' action",
    label: "Heading to pickup",
  },
  trip: {
    src: "/products/taxy-drv-trip.png",
    alt: "Taxy driver app: ride in progress along the route with a 'Complete Ride' action",
    label: "Ride in progress",
  },
};

export default function TaxyShowcase() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % STEPS.length),
      STEPS[index].ms,
    );
    return () => window.clearTimeout(timer);
  }, [index, reduced, paused]);

  const step = STEPS[index];
  const driver = DRIVER_FRAMES[step.driver];

  return (
    <div
      className="rounded-2xl border border-card-border bg-card-bg p-5 sm:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Taxy rider and driver apps, step by step"
    >
      {/* Phones */}
      <div className="flex items-end justify-center gap-4 sm:gap-6">
        {/* Rider phone */}
        <div className="w-[56%] max-w-[250px] shrink-0">
          <div className="relative rounded-[2rem] border border-white/12 bg-[#0c0c0c] p-[5px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)]">
            {/* side button */}
            <span
              aria-hidden="true"
              className="absolute right-[-2px] top-[24%] h-10 w-[2px] rounded-full bg-white/15"
            />
            <div className="relative aspect-[460/1022] overflow-hidden rounded-[1.65rem] bg-black">
              {STEPS.map((s, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={s.src}
                  src={s.src}
                  alt={i === index ? s.alt : ""}
                  aria-hidden={i === index ? undefined : true}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            {/* inner highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/10"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            Rider
          </p>
        </div>

        {/* Driver phone */}
        <div className="w-[34%] max-w-[152px] shrink-0 pb-10">
          <div className="relative rounded-[1.4rem] border border-white/12 bg-[#0c0c0c] p-[4px] shadow-[0_20px_46px_-22px_rgba(0,0,0,0.95)]">
            <div className="relative aspect-[9/20] overflow-hidden rounded-[1.15rem] bg-black">
              {(Object.keys(DRIVER_FRAMES) as DriverState[]).map((key) => {
                const frame = DRIVER_FRAMES[key];
                const active = key === step.driver;
                return (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={frame.src}
                    src={frame.src}
                    alt={active ? frame.alt : ""}
                    aria-hidden={active ? undefined : true}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              })}
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.4rem] border border-white/10"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-accent/70">
            Driver
          </p>
          <p className="mt-1 text-center text-[10px] leading-tight text-foreground/40">
            {driver.label}
          </p>
        </div>
      </div>

      {/* Caption */}
      <p
        aria-live="polite"
        className="mt-6 min-h-[2.75rem] text-center text-sm leading-relaxed text-foreground/70 sm:min-h-[2.25rem]"
      >
        {step.caption}
      </p>

      {/* Progress bar */}
      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Step ${i + 1} of ${STEPS.length}: ${s.label}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              i === index
                ? "w-6 bg-accent"
                : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-foreground/35">
        Real screenshots from the Taxy rider and driver apps, captured in Oujda.
      </p>
    </div>
  );
}
