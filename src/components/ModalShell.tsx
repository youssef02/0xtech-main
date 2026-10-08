"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Announced to assistive tech as the dialog's name. */
  label: string;
  children: ReactNode;
  /** Extra classes for the panel, e.g. a narrower max width. */
  panelClassName?: string;
}

/**
 * The overlay the product pages open media in.
 *
 * Portalled to <body> on purpose: the products page wraps each product's
 * left column in `position: sticky`, which creates a stacking context, so a
 * dialog rendered in place is trapped behind its siblings however high its
 * z-index is. Escaping to the body is the only fix that stays correct when
 * the layout changes again.
 */
export default function ModalShell({
  open,
  onClose,
  label,
  children,
  panelClassName = "",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => onClose(), [onClose]);

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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={close}
      className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-background shadow-[0_0_60px_rgba(86,172,49,0.08)] ${panelClassName || "max-w-5xl"}`}
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
        {children}
      </div>
    </div>,
    document.body,
  );
}
