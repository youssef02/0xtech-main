import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about 0xTech — our mission, values, and the team building software that matters.",
  openGraph: {
    title: "About 0xTech",
    description: "Learn about 0xTech — our mission, values, and the team building software that matters.",
    url: "https://0xtech.dev/about",
  },
};

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
        About us
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Building technology that matters.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        <span className="font-mono font-semibold text-foreground/80">0xTech</span> was founded with a simple belief: great software can transform
        businesses. We partner with startups and enterprises to design, build,
        and scale products that users love.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_rgba(86,172,49,0.18)]">
          <div className="mb-5 flex items-center gap-4">
            <span className="font-mono text-xs text-foreground/30">01</span>
            <span className="h-px flex-1 bg-card-border transition-colors duration-500 group-hover:bg-accent/25" />
          </div>
          <h2 className="text-xl font-semibold text-accent">Our Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            To empower organizations with technology solutions that are
            reliable, scalable, and built for the long term. We believe in
            clean code, transparent collaboration, and measurable results.
          </p>
        </div>
        <div className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_rgba(86,172,49,0.18)]">
          <div className="mb-5 flex items-center gap-4">
            <span className="font-mono text-xs text-foreground/30">02</span>
            <span className="h-px flex-1 bg-card-border transition-colors duration-500 group-hover:bg-accent/25" />
          </div>
          <h2 className="text-xl font-semibold text-accent">Our Values</h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/60">
            {[
              ["Craft", "We take pride in the quality of our work."],
              ["Transparency", "Open communication at every step."],
              ["Impact", "We measure success by outcomes, not hours."],
              ["Growth", "Continuous learning is in our DNA."],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-2.5">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                <span>
                  <span className="font-medium text-foreground/80">{k}</span>
                  {" — "}
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What we've actually built — the concrete claim */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-card-border px-8 py-5">
          <h2 className="text-xl font-semibold">What we&apos;re building</h2>
          <Link
            href="/products"
            className="group/p inline-flex items-center gap-1.5 text-xs font-medium text-accent/80 transition-colors hover:text-accent"
          >
            See the products
            <span className="transition-transform duration-300 group-hover/p:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-px bg-card-border sm:grid-cols-4">
          {[
            { stat: "5", label: "Products in build" },
            { stat: "1", label: "In active development" },
            { stat: "5", label: "Sectors covered" },
            { stat: "3", label: "Markets: DE · MA · EU" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card-bg px-5 py-6 text-center transition-colors duration-300 hover:bg-accent/[0.06]"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-mono text-3xl font-bold text-accent">
                {item.stat}
              </dd>
              <p className="mt-1.5 text-xs leading-snug text-foreground/50">
                {item.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
