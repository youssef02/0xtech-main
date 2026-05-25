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
        {services.map((svc) => (
          <div
            key={svc.title}
            className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.06)]"
          >
            <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">{svc.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              {svc.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {svc.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-card-border px-3 py-1 text-xs text-foreground/50"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
          className="mt-8 inline-flex rounded-full bg-accent px-10 py-4 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
        >
          Get a Free Consultation
        </Link>
      </div>
    </div>
  );
}
