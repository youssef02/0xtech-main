import Link from "next/link";
import ParticleHero from "@/components/ParticleHero";

/**
 * The suite, as the home page tells it: a name, the sector it sits in, where it
 * is, and one screenshot so the claim is visible rather than asserted.
 * The full write-up and the screenshot carousels live on /products.
 */
const suite = [
  {
    id: "lexrech",
    name: "LexRech",
    domain: "Legal",
    status: "building" as const,
    blurb:
      "Practice management for German law firms — XRechnung invoicing, beA court filing, DATEV export, time tracking and GDPR tooling on one platform.",
    shot: "/products/lexrech-dashboard.png",
    shotAlt: "LexRech firm dashboard showing matters, unbilled hours and revenue",
  },
  {
    id: "quris",
    name: "Quris",
    domain: "Health",
    status: "next" as const,
    blurb:
      "Deep-learning PSMA-PET/CT analysis — lesion detection, TNM staging and tumour burden in under a minute, with a 3D DICOM viewer in the browser.",
    shot: "/products/quris-landing.png",
    shotAlt: "Quris landing page with its interactive 3D anatomy hero",
  },
  {
    id: "ois",
    name: "OIS",
    domain: "Intelligence",
    status: "next" as const,
    blurb:
      "Studies proven startup models in Germany, the US and the UK and compiles VC-grade opportunity dossiers for emerging markets in five minutes.",
    shot: null,
    shotAlt: "",
  },
  {
    id: "xfunds",
    name: "XFunds",
    domain: "Finance",
    status: "next" as const,
    blurb:
      "Fund administration for hedge, PE, VC and real estate — NAV tracking, capital calls, double-entry accounting and an AIFMD/SEC/FCA compliance engine.",
    shot: "/products/xfunds-funds.png",
    shotAlt: "XFunds fund overview showing AUM and committed capital",
  },
  {
    id: "taxy",
    name: "Taxy",
    domain: "Mobility",
    status: "next" as const,
    blurb:
      "Real-time ride-hailing for Morocco — live matching over WebSocket, OSRM road-following routes, in-app chat and wallet payments in MAD.",
    shot: "/products/taxy-card.png",
    shotAlt: "Taxy rider and driver apps side by side",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />

        <ParticleHero />

        <div className="relative z-10">
          <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
            Your idea. Our engineering.
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            We turn ideas into{" "}
            <span className="text-accent drop-shadow-[0_0_20px_rgba(86,172,49,0.3)]">
              products
            </span>
            .
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg text-foreground/60">
            Got an app idea but no tech team?{" "}
            <span className="font-mono font-semibold text-foreground/80">0xTech</span>{" "}
            designs, builds, and launches software products — from first
            prototype to production. You bring the vision, we bring the code.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
            >
              Tell Us Your Idea
            </Link>
            <Link
              href="/roadmap"
              className="rounded-full border border-accent/30 px-8 py-3 text-sm font-semibold transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_24px_rgba(86,172,49,0.15)]"
            >
              See What We&apos;re Building
            </Link>
          </div>

          {/* Proof bar — the suite, named, before anyone has to scroll. */}
          <div className="mt-16 border-t border-white/8 pt-6">
            <p className="mb-4 font-mono text-[0.68rem] tracking-[0.18em] text-foreground/35 uppercase">
              Five products in build
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {suite.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products#${p.id}`}
                    className="group/p flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-foreground"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        p.status === "building" ? "bg-accent" : "bg-yellow-400/70"
                      }`}
                    />
                    <span className="font-medium">{p.name}</span>
                    <span className="text-foreground/30 transition-colors group-hover/p:text-foreground/50">
                      {p.domain}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          From concept to launch in 3 steps
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Share Your Idea",
              desc: "Tell us what you want to build. We'll help you refine scope, define features, and map out the tech stack.",
            },
            {
              step: "02",
              title: "We Build It",
              desc: "Our team designs, develops, and tests your product with weekly updates and full transparency.",
            },
            {
              step: "03",
              title: "Launch & Scale",
              desc: "We deploy to production, set up infrastructure, and support you as your user base grows.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(86,172,49,0.06)]"
            >
              <span className="text-3xl font-black font-mono text-accent/30 group-hover:text-accent/60 transition-colors">
                {item.step}
              </span>
              <h3 className="mt-3 mb-2 text-lg font-semibold group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          What we bring to the table
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Full-Stack Development",
              desc: "Web apps, mobile apps, APIs, dashboards — whatever your product needs, built with modern tech.",
            },
            {
              title: "Cloud & Infrastructure",
              desc: "Scalable hosting on AWS, GCP, or Azure with CI/CD, monitoring, and 99.9% uptime.",
            },
            {
              title: "Product Strategy",
              desc: "We don't just write code — we help you prioritize features, validate ideas, and ship what matters.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-card-border bg-card-bg p-8 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(86,172,49,0.06)]"
            >
              <h3 className="mb-3 text-lg font-semibold group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The suite — shown, not just claimed */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
              What we&apos;re building
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Five products, built in the open
            </h2>
          </div>
          <Link
            href="/products"
            className="group/all inline-flex items-center gap-2 text-sm font-medium text-foreground/55 transition-colors hover:text-accent"
          >
            See all products
            <span className="transition-transform duration-300 group-hover/all:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suite.map((p, i) => (
            <Link
              key={p.id}
              href={`/products#${p.id}`}
              /* First card spans two columns on wide screens — LexRech is the
                 one actually in build, so it earns the extra room. */
              className={`group/card flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_rgba(86,172,49,0.25)] ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Media */}
              <div className="relative overflow-hidden bg-black/40">
                {p.shot ? (
                  <div className={i === 0 ? "aspect-[2/1]" : "aspect-[16/10]"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.shot}
                      alt={p.shotAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover/card:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(86,172,49,1) 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, rgba(86,172,49,1) 0 1px, transparent 1px 40px)",
                      }}
                    />
                    <p className="relative font-mono text-3xl font-black tracking-tight text-accent/25">
                      OIS
                    </p>
                  </div>
                )}
              </div>

              {/* Copy */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <span className="font-mono text-xs text-foreground/35">
                    {p.domain}
                  </span>
                  {/* Status reads in the copy row — over a screenshot it was
                      competing with whatever happened to be behind it. */}
                  <span
                    className={`ml-auto shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] tracking-wider uppercase ${
                      p.status === "building"
                        ? "border-accent/40 text-accent"
                        : "border-yellow-400/35 text-yellow-400/90"
                    }`}
                  >
                    {p.status === "building" ? "In development" : "Upcoming"}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground/55">
                  {p.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent/80 transition-colors group-hover/card:text-accent">
                  Take a look
                  <span className="transition-transform duration-300 group-hover/card:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to build something?
          </h2>
          <p className="mt-4 text-foreground/60">
            Whether it&apos;s a SaaS app, a marketplace, an internal tool, or
            something entirely new — we&apos;d love to hear about it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-accent px-10 py-4 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
          >
            Let&apos;s Talk About Your Idea
          </Link>
        </div>
      </section>
    </>
  );
}
