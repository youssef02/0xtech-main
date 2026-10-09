"use client";

import { useCallback, useEffect, useState } from "react";
import ModalShell from "./ModalShell";

interface Screen {
  src: string;
  alt: string;
  /** Short label under the thumbnail. */
  label: string;
  /** One line shown beside the screen once it is open. */
  caption: string;
}

/** Account creation and driver onboarding, shown as a still strip. */
const SETUP: Screen[] = [
  {
    src: "/products/taxy-acc-signin.png",
    alt: "Taxy sign-in screen asking for a phone number and password",
    label: "Sign in",
    caption:
      "Returning riders sign in with their phone number and password — no email required.",
  },
  {
    src: "/products/taxy-acc-phone.png",
    alt: "Taxy sign-up step one, with a +212 Moroccan phone number entered",
    label: "Phone",
    caption:
      "Sign-up opens on a Moroccan number — +212, hinted and validated. Step 1 of 6.",
  },
  {
    src: "/products/taxy-acc-terms.png",
    alt: "Taxy sign-up step five, terms of service and privacy consent accepted",
    label: "Consent",
    caption:
      "Terms of service and privacy consent, before anything is created. Step 5 of 6.",
  },
  {
    src: "/products/taxy-acc-verify.png",
    alt: "Taxy sign-up step six, six-digit SMS verification code entry with a resend timer",
    label: "SMS code",
    caption:
      "A six-digit code goes to that number, with a resend timer. Step 6 of 6.",
  },
  {
    src: "/products/taxy-acc-menu.png",
    alt: "Taxy account menu with profile, ride history, payment methods, wallet, settings and switch to driver mode",
    label: "Account",
    caption:
      "Profile, ride history, payment methods, wallet, settings — and the switch to driver mode.",
  },
  {
    src: "/products/taxy-acc-driver.png",
    alt: "Taxy 'Become a Driver' registration form: licence number and expiry, document uploads and background-check consent",
    label: "Become a driver",
    caption:
      "Driver onboarding: licence and expiry, licence and insurance uploads, background-check consent.",
  },
];

/**
 * The two things the animated ride showcase above deliberately leaves out:
 * the recording of both handsets during one ride, and how an account — rider
 * or driver — is created in the first place.
 *
 * The setup screens stay out of the rotation on purpose. That rotation tells
 * one story, a ride from request to completion, and twelve auto-advancing
 * steps would bury it.
 */
export default function TaxyExtras() {
  const [videoOpen, setVideoOpen] = useState(false);
  // Which setup screen is open full size, or null for none.
  const [shot, setShot] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setShot((i) =>
        i === null ? i : (i + delta + SETUP.length) % SETUP.length,
      ),
    [],
  );

  // Arrow keys walk the set. Escape and the backdrop are ModalShell's job.
  useEffect(() => {
    if (shot === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shot, step]);

  // Hand the caret back to the thumbnail that opened the viewer, so tabbing
  // carries on from where it was rather than restarting at the top of the page.
  const closeShot = useCallback(() => {
    const open = shot;
    setShot(null);
    if (open !== null) {
      requestAnimationFrame(() =>
        document.getElementById(`taxy-setup-${open}`)?.focus(),
      );
    }
  }, [shot]);

  const active = shot === null ? null : SETUP[shot];

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
            One real ride in Oujda on both handsets — hailed, driven, paid, rated
          </span>
        </span>
      </button>

      <div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p className="font-mono text-[0.68rem] tracking-[0.18em] text-foreground/35 uppercase">
            Getting an account — rider or driver
          </p>
          <p className="shrink-0 text-[0.68rem] text-foreground/30">
            Tap to enlarge
          </p>
        </div>

        {/* Three up, two rows — six across the column made every screen about
            90px wide, which is narrower than the phone's own text. Three is
            the point where the headings become readable without opening
            anything, and a grid keeps driver registration on screen instead
            of behind a sideways drag. */}
        <ul className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          {SETUP.map((screen, i) => (
            <li key={screen.src}>
              <button
                id={`taxy-setup-${i}`}
                type="button"
                onClick={() => setShot(i)}
                /* The button's label wins over the image's alt inside it,
                   so it has to carry the description as well as the verb. */
                aria-label={`${screen.alt} — enlarge`}
                className="group/shot relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(86,172,49,0.07)] focus-visible:border-accent/60 focus-visible:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.src}
                  alt={screen.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
                {/* Zoom affordance — the thumbnails look like decoration
                    otherwise, and nobody clicks decoration. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 grid place-items-center bg-background/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/40 bg-background/80 text-accent">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </span>
              </button>
              <p className="mt-2 text-center text-[0.7rem] leading-snug text-foreground/55">
                {screen.label}
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

      {/* One screen, full size, with the rest a keypress away. */}
      <ModalShell
        open={active !== null}
        onClose={closeShot}
        label="Taxy account setup screens"
        /* Hug the screen rather than box it: the image is capped at 68vh, so
           on a short window a fixed-width panel leaves a wide black margin
           either side of a narrow phone. 0.45 is the screenshots' aspect. */
        panelClassName="max-w-[min(24rem,calc(68vh*0.45+2rem))]"
      >
        {active && (
          <>
            <div className="flex justify-center bg-black px-4 pt-4 pb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[68vh] w-auto rounded-xl"
              />
            </div>
            <div className="border-t border-card-border px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{active.label}</p>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous screen"
                    className="grid h-8 w-8 place-items-center rounded-full border border-card-border text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <span className="w-10 text-center font-mono text-[0.7rem] text-foreground/40">
                    {(shot ?? 0) + 1}/{SETUP.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next screen"
                    className="grid h-8 w-8 place-items-center rounded-full border border-card-border text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
              <p
                aria-live="polite"
                className="mt-1.5 text-xs leading-relaxed text-foreground/50"
              >
                {active.caption}
              </p>
            </div>
          </>
        )}
      </ModalShell>
    </div>
  );
}
