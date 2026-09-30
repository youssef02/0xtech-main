"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  dotClass: string;
}

/**
 * Sticky in-page nav for the products page. Highlights whichever product
 * section is currently nearest the top of the viewport.
 */
export default function ProductNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const pick = () => {
      // The section whose top is closest to (but not far below) the header line.
      let best = sections[0];
      let bestDist = Infinity;
      for (const el of sections) {
        const d = Math.abs(el.getBoundingClientRect().top - 140);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      }
      setActive(best.id);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [items]);

  return (
    <nav
      aria-label="Jump to product"
      className="sticky top-16 z-30 -mx-6 mt-12 border-y border-card-border bg-background/85 px-6 py-3 backdrop-blur"
    >
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "true" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-all duration-300 ${
                  on
                    ? "bg-accent/12 text-foreground"
                    : "text-foreground/50 hover:bg-white/[0.04] hover:text-foreground/85"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-opacity duration-300 ${it.dotClass} ${
                    on ? "opacity-100" : "opacity-40"
                  }`}
                />
                {it.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
