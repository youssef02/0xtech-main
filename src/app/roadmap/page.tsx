import type { Metadata } from "next";
import Link from "next/link";
import OISMediaButtons from "@/components/OISMediaButtons";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "See what 0xTech is building — our product roadmap from LexRech to 6 planned apps.",
  openGraph: {
    title: "Roadmap — 0xTech",
    description: "See what 0xTech is building — our product roadmap from LexRech to 6 planned apps.",
    url: "https://0xtech.dev/roadmap",
  },
};

type Status = "in-progress" | "upcoming" | "planned";

interface Milestone {
  phase: string;
  title: string;
  description: string;
  status: Status;
  target: string;
  link?: string;
  id?: string;
}

const milestones: Milestone[] = [
  {
    phase: "Phase 1",
    title: "LexRech — Law Firm Management Platform",
    description:
      "Complete practice management software for German law firms. XRechnung-compliant invoicing, beA court communication, client portal, GDPR/DSGVO compliance suite, DATEV export, time tracking, and case management — all in one platform.",
    status: "in-progress",
    target: "Q2 2026",
    link: "https://lexrech.de",
  },
  {
    id: "ois",
    phase: "Phase 2",
    title: "OIS — Opportunity Intelligence System",
    description:
      "An AI platform that analyzes proven startup models in advanced markets (Germany, USA, UK) and generates validated, localized opportunity dossiers for emerging markets — starting with Morocco. Scans, extracts, maps, scores, and compiles VC-grade reports in under 5 minutes instead of the 2–4 weeks classic market research takes.",
    status: "upcoming",
    target: "Q3 2026",
  },
  {
    phase: "Phase 3",
    title: "App #3 — To Be Announced",
    description: "Planned for development after the second product launch.",
    status: "planned",
    target: "Q4 2026",
  },
  {
    phase: "Phase 4",
    title: "App #4 — To Be Announced",
    description: "Expanding the 0xTech product ecosystem.",
    status: "planned",
    target: "Q1 2027",
  },
  {
    phase: "Phase 5",
    title: "App #5 — To Be Announced",
    description: "Further diversification into new verticals.",
    status: "planned",
    target: "Q2 2027",
  },
  {
    phase: "Phase 6",
    title: "App #6 — To Be Announced",
    description: "Completing the initial 0xTech product suite.",
    status: "planned",
    target: "Q3 2027",
  },
];

const statusConfig: Record<Status, { label: string; dotClass: string; badgeClass: string }> = {
  "in-progress": {
    label: "In Development",
    dotClass: "bg-accent shadow-[0_0_8px_rgba(0,255,136,0.6)]",
    badgeClass: "border-accent/40 text-accent",
  },
  upcoming: {
    label: "Upcoming",
    dotClass: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]",
    badgeClass: "border-yellow-400/40 text-yellow-400",
  },
  planned: {
    label: "Planned",
    dotClass: "bg-foreground/30",
    badgeClass: "border-foreground/20 text-foreground/40",
  },
};

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
        Roadmap
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        What we&apos;re building.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        <span className="font-mono font-semibold text-foreground/80">0xTech</span> is
        developing a suite of 6 products. Here&apos;s our timeline — one app at a
        time, built right.
      </p>

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-card-border to-card-border" />

        <div className="space-y-12">
          {milestones.map((m, i) => {
            const config = statusConfig[m.status];
            return (
              <div key={i} className="relative pl-10">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-[3px] border-background ${config.dotClass}`}
                />

                {/* Content */}
                <div
                  className={`rounded-2xl border bg-card-bg p-6 transition-all ${
                    m.status === "in-progress"
                      ? "border-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.06)]"
                      : "border-card-border"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-bold text-foreground/40 uppercase tracking-widest">
                      {m.phase}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badgeClass}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-foreground/30 ml-auto font-mono">
                      {m.target}
                    </span>
                  </div>
                  <h2
                    className={`text-lg font-semibold ${
                      m.status === "in-progress" ? "text-accent" : ""
                    }`}
                  >
                    {m.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {m.description}
                  </p>
                  {m.link && (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-4 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(0,255,136,0.15)]"
                    >
                      Visit lexrech.de &rarr;
                    </a>
                  )}
                  {m.id === "ois" && <OISMediaButtons />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA — Have an idea? */}
      <div className="mt-24 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Have an idea? Let&apos;s build it.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/60">
          We don&apos;t just build our own products — we help founders, startups,
          and businesses turn their ideas into real, shipped software. From
          concept to launch, we handle the tech so you can focus on your vision.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
