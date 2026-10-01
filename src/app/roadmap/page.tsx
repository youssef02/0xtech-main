import type { Metadata } from "next";
import Link from "next/link";
import OISMediaButtons from "@/components/OISMediaButtons";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "See what 0xTech is building — our product roadmap from LexRech, Quris, OIS, XFunds, and Taxy.",
  openGraph: {
    title: "Roadmap — 0xTech",
    description: "See what 0xTech is building — our product roadmap from LexRech, Quris, OIS, XFunds, and Taxy.",
    url: "https://0xtech.dev/roadmap",
  },
};

type Status = "in-progress" | "upcoming" | "planned";

interface Milestone {
  phase: string;
  title: string;
  /** Short name, used for the jump nav and the screenshot caption. */
  name: string;
  description: string;
  status: Status;
  /** The single claim that makes this phase worth caring about. */
  headline?: string;
  /** One representative screenshot, so the phase is shown and not just stated. */
  shot?: string;
  shotAlt?: string;
  link?: string;
  id?: string;
}

const milestones: Milestone[] = [
  {
    phase: "Phase 1",
    title: "LexRech — Law Firm Management Platform",
    name: "LexRech",
    headline: "XRechnung EN 16931 · beA · DATEV",
    shot: "/products/lexrech-dashboard.png",
    shotAlt: "LexRech firm dashboard",
    description:
      "Complete practice management software for German law firms. XRechnung-compliant invoicing, beA court communication, client portal, GDPR/DSGVO compliance suite, DATEV export, time tracking, and case management — all in one platform.",
    status: "in-progress",
    link: "https://lexrech.de",
  },
  {
    phase: "Phase 2",
    title: "Quris — AI Medical Imaging for Prostate Cancer",
    name: "Quris",
    headline: "~30 min of manual analysis → under 1 min",
    shot: "/products/quris-landing.png",
    shotAlt: "Quris landing page with its 3D anatomy hero",
    description:
      "Deep-learning analysis of PSMA-PET/CT scans. Automated lesion detection, TNM staging, and tumor burden quantification — cutting manual scan analysis from ~30 minutes to under 1 minute, with an interactive 3D web viewer and PACS integration.",
    status: "upcoming",
  },
  {
    id: "ois",
    phase: "Phase 3",
    title: "OIS — Opportunity Intelligence System",
    name: "OIS",
    headline: "2–4 weeks of market research → 5 min",
    description:
      "An AI platform that analyzes proven startup models in advanced markets (Germany, USA, UK) and generates validated, localized opportunity dossiers for emerging markets — starting with Morocco. Scans, extracts, maps, scores, and compiles VC-grade reports in under 5 minutes instead of the 2–4 weeks classic market research takes.",
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "XFunds — Alternative Investment Fund Administration",
    name: "XFunds",
    headline: "Full fund lifecycle · AIFMD · SEC · FCA",
    shot: "/products/xfunds-funds.png",
    shotAlt: "XFunds fund overview with AUM and committed capital",
    description:
      "Multi-tenant platform for hedge funds, private equity, VC, and real estate funds. Full fund lifecycle: NAV tracking, capital calls and distributions, double-entry accounting, high-water-mark fee engine, and a compliance engine covering AIFMD, SEC, FCA, and MAS.",
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Taxy — Ride-Hailing for Morocco",
    name: "Taxy",
    headline: "Real-time matching · OSRM routes · MAD wallet",
    shot: "/products/taxy-card.png",
    shotAlt: "Taxy rider and driver apps side by side",
    description:
      "Real-time ride-sharing platform for the Moroccan market. Live driver tracking, OSRM road-following routes, in-app chat, wallet payments in MAD, and a driver earnings dashboard.",
    status: "upcoming",
  },
  {
    phase: "Phase 6",
    title: "App #6 — To Be Announced",
    name: "App #6",
    description: "Completing the initial 0xTech product suite.",
    status: "planned",
  },
];

const statusConfig: Record<Status, { label: string; dotClass: string; badgeClass: string }> = {
  "in-progress": {
    label: "In Development",
    dotClass: "bg-accent shadow-[0_0_8px_rgba(86,172,49,0.6)]",
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
    <div className="mx-auto max-w-6xl px-6 py-24">
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

      {/* Progress summary — where the suite actually stands. */}
      <dl className="mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-card-border bg-card-border">
        {[
          { v: "1", l: "In development", c: "text-accent" },
          { v: "4", l: "Upcoming", c: "text-yellow-400" },
          { v: "1", l: "To be announced", c: "text-foreground/40" },
        ].map((x) => (
          <div key={x.l} className="bg-card-bg px-4 py-4">
            <dt className="sr-only">{x.l}</dt>
            <dd className={`font-mono text-2xl font-bold ${x.c}`}>{x.v}</dd>
            <p className="mt-1 text-[0.7rem] text-foreground/45">{x.l}</p>
          </div>
        ))}
      </dl>

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Rail */}
        <div className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-accent/60 via-card-border to-transparent" />

        <div className="space-y-10">
          {milestones.map((m, i) => {
            const config = statusConfig[m.status];
            const live = m.status === "in-progress";
            return (
              <div key={i} className="group relative pl-10">
                {/* Node */}
                <div
                  className={`absolute top-6 left-0 h-[22px] w-[22px] rounded-full border-[3px] border-background transition-transform duration-500 group-hover:scale-110 ${config.dotClass}`}
                />

                <div
                  className={`overflow-hidden rounded-2xl border bg-card-bg transition-all duration-500 group-hover:-translate-y-0.5 ${
                    live
                      ? "border-accent/30 shadow-[0_0_30px_rgba(86,172,49,0.06)] group-hover:border-accent/50"
                      : "border-card-border group-hover:border-accent/25"
                  }`}
                >
                  <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                    {/* Copy */}
                    <div className="p-6 sm:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-bold tracking-widest text-foreground/40 uppercase">
                          {m.phase}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badgeClass}`}
                        >
                          {config.label}
                        </span>
                      </div>

                      <h2
                        className={`text-lg font-semibold ${live ? "text-accent" : ""}`}
                      >
                        {m.title}
                      </h2>

                      {m.headline && (
                        <p className="mt-2.5 font-mono text-xs text-accent/70">
                          {m.headline}
                        </p>
                      )}

                      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                        {m.description}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        {m.link && (
                          <a
                            href={m.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-4 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(86,172,49,0.15)]"
                          >
                            Visit lexrech.de &rarr;
                          </a>
                        )}
                        {m.name !== "App #6" && (
                          <Link
                            href={`/products#${m.name.toLowerCase()}`}
                            className="group/l inline-flex items-center gap-1.5 text-xs font-medium text-foreground/45 transition-colors hover:text-accent"
                          >
                            See it in detail
                            <span className="transition-transform duration-300 group-hover/l:translate-x-0.5">
                              &rarr;
                            </span>
                          </Link>
                        )}
                      </div>

                      {m.id === "ois" && <OISMediaButtons />}
                    </div>

                    {/* Media */}
                    <div className="relative hidden overflow-hidden border-l border-card-border bg-black/30 md:block">
                      {m.shot ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={m.shot}
                          alt={m.shotAlt ?? ""}
                          loading="lazy"
                          className="h-full w-full object-cover object-left-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full min-h-[180px] items-center justify-center">
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-[0.06]"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(90deg, rgba(86,172,49,1) 0 1px, transparent 1px 36px), repeating-linear-gradient(0deg, rgba(86,172,49,1) 0 1px, transparent 1px 36px)",
                            }}
                          />
                          <p className="relative font-mono text-2xl font-black tracking-tight text-accent/20">
                            {m.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
