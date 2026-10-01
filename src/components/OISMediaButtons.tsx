"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Modal = "video" | "deck" | null;

export default function OISMediaButtons() {
  const [open, setOpen] = useState<Modal>(null);
  // Portalling needs the DOM, so only after mount — keeps SSR output identical.
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

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
              <iframe
                src="/ois-presentation.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="OIS — Opportunity Intelligence System pitch deck"
                className="w-full h-[85vh]"
              />
            )}
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
