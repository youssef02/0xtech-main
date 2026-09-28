import Link from "next/link";
import ParticleHero from "@/components/ParticleHero";

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

      {/* Currently building — LexRech */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:gap-8">
            <div className="flex-1">
              <p className="text-sm font-mono tracking-widest text-accent uppercase mb-2">
                Currently building
              </p>
              <h2 className="text-2xl font-bold">LexRech</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                A complete law firm management platform for the German market.
                XRechnung invoicing, beA court integration, client portal, GDPR
                compliance tools, DATEV export, and case management — everything
                a law firm needs, on one platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href="https://lexrech.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-accent/30 px-5 py-2 text-xs font-medium text-accent transition-all hover:bg-accent/10"
                >
                  Visit lexrech.de &rarr;
                </a>
                <Link
                  href="/roadmap"
                  className="rounded-full border border-card-border px-5 py-2 text-xs font-medium text-foreground/50 transition-all hover:border-accent/30 hover:text-accent"
                >
                  Full Roadmap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming next — Quris */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10">
          <div className="text-center sm:text-left">
            <p className="text-sm font-mono tracking-widest text-accent uppercase mb-2">
              Coming next
            </p>
            <h2 className="text-2xl font-bold">
              Quris — AI Medical Imaging for Prostate Cancer
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              Deep-learning analysis of PSMA-PET/CT scans. Automated lesion
              detection, TNM staging, and tumor burden quantification — cutting
              manual scan analysis from ~30 minutes to under 1 minute, with an
              interactive 3D web viewer and PACS integration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link
                href="/products"
                className="rounded-full border border-accent/30 px-5 py-2 text-xs font-medium text-accent transition-all hover:bg-accent/10"
              >
                View all products &rarr;
              </Link>
            </div>
          </div>
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
