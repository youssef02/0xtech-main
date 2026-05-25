import type { Metadata } from "next";

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

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-accent">Our Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            To empower organizations with technology solutions that are
            reliable, scalable, and built for the long term. We believe in
            clean code, transparent collaboration, and measurable results.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-accent">Our Values</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/60">
            <li>Craft &mdash; We take pride in the quality of our work.</li>
            <li>Transparency &mdash; Open communication at every step.</li>
            <li>Impact &mdash; We measure success by outcomes, not hours.</li>
            <li>Growth &mdash; Continuous learning is in our DNA.</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-card-border bg-card-bg p-8">
        <h2 className="text-xl font-semibold">By the Numbers</h2>
        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { stat: "50+", label: "Projects Delivered" },
            { stat: "20+", label: "Team Members" },
            { stat: "99.9%", label: "Uptime SLA" },
            { stat: "5+", label: "Years in Business" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-bold text-accent">{item.stat}</p>
              <p className="mt-1 text-xs text-foreground/50">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
