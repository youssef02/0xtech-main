import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "From idea to MVP to production — 0xTech offers full-stack development, cloud infrastructure, and ongoing technical partnership.",
  openGraph: {
    title: "Services — 0xTech",
    description: "From idea to MVP to production — 0xTech offers full-stack development, cloud infrastructure, and ongoing technical partnership.",
    url: "https://0xtech.dev/services",
  },
};

const services = [
  {
    title: "Idea to MVP",
    description:
      "Have an app idea but no tech team? We take your concept, design the architecture, and build a working MVP you can demo, test, and pitch to investors.",
    features: ["Product Scoping", "UI/UX Design", "Prototype & MVP", "Investor-ready Demos"],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "Full-stack applications built with React, Next.js, React Native, and Node.js. Clean code, modern UI, and production-ready from day one.",
    features: ["Progressive Web Apps", "Native Mobile Apps", "API Development", "Real-time Systems"],
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "We set up and manage your cloud so you never worry about uptime, scaling, or deployment. AWS, GCP, Azure — we've got it covered.",
    features: ["Cloud Architecture", "CI/CD Pipelines", "Cost Optimization", "99.9% Uptime"],
  },
  {
    title: "Ongoing Partnership",
    description:
      "Need a dedicated tech partner, not just a one-off project? We offer retainers for continuous development, support, and scaling as your business grows.",
    features: ["Dedicated Team", "Weekly Sprints", "CTO-as-a-Service", "Priority Support"],
  },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
        What we do
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        We build your idea. You grow your business.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        Whether you&apos;re a founder with a napkin sketch or a company that
        needs a technical partner — we handle the engineering end-to-end.
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {services.map((svc, i) => (
          <div
            key={svc.title}
            className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgba(86,172,49,0.2)]"
          >
            {/* Index rule, matching the products page */}
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-xs text-foreground/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-card-border transition-colors duration-500 group-hover:bg-accent/25" />
            </div>
            <h2 className="text-xl font-semibold transition-colors group-hover:text-accent">
              {svc.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              {svc.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {svc.features.map((f) => (
                <li
                  key={f}
                  className="cursor-default rounded-full border border-card-border px-3 py-1 text-xs text-foreground/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground/80"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Proof — the services claim is backed by the suite */}
      <div className="mt-16 rounded-2xl border border-card-border bg-card-bg p-8 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
              We do this for ourselves too
            </p>
            <h2 className="text-xl font-semibold">
              Five products built with exactly this process
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground/55">
              Legal tech, medical imaging, market intelligence, fund
              administration and mobility — scoped, built and shipped in-house.
              The same team does your project.
            </p>
          </div>
          <Link
            href="/products"
            className="group/p inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/30 px-6 py-2.5 text-xs font-semibold text-accent transition-all hover:bg-accent/10"
          >
            See the work
            <span className="transition-transform duration-300 group-hover/p:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Have something in mind?
        </h2>
        <p className="mt-3 text-foreground/60">
          Tell us about your project — no commitment, just a conversation.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-accent px-10 py-4 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
        >
          Get a Free Consultation
        </Link>
      </div>
    </div>
  );
}
