"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";

/** Account creation and driver onboarding, shown as a still strip. */
const SETUP = [
  {
    src: "/products/taxy-acc-signin.png",
    alt: "Taxy sign-in screen asking for phone number and password",
    label: "Sign in",
  },
  {
    src: "/products/taxy-acc-phone.png",
    alt: "Taxy sign-up step one, asking for a phone number",
    label: "Phone",
  },
  {
    src: "/products/taxy-acc-terms.png",
    alt: "Taxy sign-up step five, terms of service and privacy consent",
    label: "Consent",
  },
  {
    src: "/products/taxy-acc-verify.png",
    alt: "Taxy sign-up step six, SMS verification code entry",
    label: "SMS code",
  },
  {
    src: "/products/taxy-acc-menu.png",
    alt: "Taxy account menu with profile, ride history, payment methods, wallet and switch to driver mode",
    label: "Account",
  },
  {
    src: "/products/taxy-acc-driver.png",
    alt: "Taxy 'Become a Driver' registration form: licence number, documents and background-check consent",
    label: "Become a driver",
  },
];

/**
 * The two things the animated ride showcase above deliberately leaves out:
 * the recording of both handsets during one ride, and how an account — rider
 * or driver — is created in the first place.
 *
 * The setup screens stay out of the rotation on purpose. That rotation tells
 * one story, a ride from request to completion, and eleven auto-advancing
 * steps would bury it.
 */
export default function TaxyExtras() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="mt-6 space-y-7">
      <button
        type="button"
        onClick={() => setVideoOpen(true)}
        className="group flex w-full items-center gap-4 rounded-2xl border border-card-border bg-card-bg px-5 py-4 text-left transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(86,172,49,0.08)]"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-background">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">
            Watch both screens, one real ride
          </span>
          <span className="block text-xs text-foreground/45">
            Both handsets through one real ride in Oujda, booked to rated — 114s
          </span>
        </span>
      </button>

      <div>
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-foreground/35 uppercase">
          Getting an account — rider or driver
        </p>
        {/* A grid, not a scroller: the last screen is driver registration and
            it has to be on screen without anyone dragging sideways to find
            it. Three up on a phone, all six once the column is wide. */}
        <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-2">
          {SETUP.map((shot) => (
            <li key={shot.src}>
              <div className="overflow-hidden rounded-xl border border-card-border bg-card-bg transition-colors duration-300 hover:border-accent/35">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-1.5 text-center text-[0.65rem] leading-snug text-foreground/40">
                {shot.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* The reel is 16:9 now. It used to be a 1140x1300 portrait slab of
          two screens, which needed a narrow panel to avoid black bars twice
          as wide as either phone; a widescreen frame wants the width back. */}
      <ModalShell
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        label="Taxy rider and driver demo"
        panelClassName="max-w-5xl"
      >
        <video
          src="/taxy-demo.mp4"
          controls
          autoPlay
          playsInline
          className="max-h-[85vh] w-full bg-black"
          aria-label="Taxy rider and driver apps during one ride, side by side"
        >
          Your browser does not support the video tag.
        </video>
        <p className="border-t border-card-border px-5 py-3 text-xs text-foreground/50">
          One ride on two handsets, recorded together — request, accept,
          pickup, trip, completion. The maps are vector tiles and the routes
          come from OSRM, both served from the same machine as the backend.
        </p>
      </ModalShell>
    </div>
  );
}
