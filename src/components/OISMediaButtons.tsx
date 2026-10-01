"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Modal = "video" | "deck" | null;

/** Slides rendered from ois-presentation.pdf at build time. */
const DECK_SLIDES = Array.from(
  { length: 11 },
  (_, i) => `/deck/slide-${String(i + 1).padStart(2, "0")}.png`,
);

export default function OISMediaButtons() {
  const [open, setOpen] = useState<Modal>(null);
  const [slide, setSlide] = useState(0);
  // Portalling needs the DOM, so only after mount — keeps SSR output identical.
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setSlide((i) => Math.min(DECK_SLIDES.length - 1, Math.max(0, i + d))),
    [],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    if (open === "deck") setSlide(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (open !== "deck") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3 justify-center sm:justify-start">
        <button
          type="button"
          onClick={() => setOpen("video")}
          className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
        >
          Watch demo
        </button>
        <button
          type="button"
          onClick={() => setOpen("deck")}
          className="rounded-full border border-accent/30 px-6 py-2.5 text-xs font-semibold text-accent transition-all hover:bg-accent/10"
        >
          View pitch deck
        </button>
      </div>

      {/* Portalled to <body>: an ancestor with position:sticky creates a
          stacking context, which would otherwise trap this behind siblings
          no matter how high its z-index is. */}
      {open &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open === "video" ? "OIS demo video" : "OIS pitch deck"}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in"
          >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-full rounded-2xl border border-accent/20 bg-background shadow-[0_0_60px_rgba(86,172,49,0.08)] overflow-hidden flex flex-col"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-card-border bg-background/80 text-foreground/70 backdrop-blur transition-all hover:border-accent/40 hover:text-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {open === "video" ? (
              <video
                src="/ois-demo.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-auto max-h-[85vh] bg-black"
                aria-label="OIS — Opportunity Intelligence System demo"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              /* Slides are images, not an embedded PDF. An <iframe> only
                 renders a PDF where the browser has a built-in viewer
                 enabled — elsewhere, and on virtually every mobile
                 browser, it silently downloads the file instead. */
              <div className="flex flex-col">
                <div className="relative bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DECK_SLIDES[slide]}
                    alt={`OIS pitch deck — slide ${slide + 1} of ${DECK_SLIDES.length}`}
                    className="max-h-[78vh] w-full object-contain"
                  />

                  {slide > 0 && (
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous slide"
                      className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-foreground/80 backdrop-blur transition-all hover:border-accent/50 hover:text-accent"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  )}
                  {slide < DECK_SLIDES.length - 1 && (
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next slide"
                      className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-foreground/80 backdrop-blur transition-all hover:border-accent/50 hover:text-accent"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-card-border px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    {DECK_SLIDES.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setSlide(i)}
                        aria-label={`Slide ${i + 1}`}
                        aria-current={i === slide}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === slide
                            ? "w-5 bg-accent"
                            : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-foreground/45">
                      {slide + 1} / {DECK_SLIDES.length}
                    </span>
                    <a
                      href="/ois-presentation.pdf"
                      download
                      className="text-xs font-medium text-foreground/50 transition-colors hover:text-accent"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
