import type { Metadata } from "next";
import Link from "next/link";
import OISMediaButtons from "@/components/OISMediaButtons";
import TaxyShowcase from "@/components/TaxyShowcase";
import ProductCarousel, { type Shot } from "@/components/ProductCarousel";
import ProductNav from "@/components/ProductNav";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The 0xTech product suite — LexRech, Quris, OIS, XFunds, and Taxy. Five products, one engineering standard.",
  openGraph: {
    title: "Products — 0xTech",
    description:
      "The 0xTech product suite — LexRech, Quris, OIS, XFunds, and Taxy. Five products, one engineering standard.",
    url: "https://0xtech.dev/products",
  },
};

type Status = "in-development" | "upcoming";

interface Product {
  id: string;
  name: string;
  tagline: string;
  /** One line on the problem it solves — the first thing a visitor reads. */
  description: string;
  details: string;
  status: Status;
  /** Three headline claims, shown as a strip under the description. */
  metrics: { value: string; label: string }[];
  features: string[];
  /** Auto-advancing screenshot carousel. */
  shots?: Shot[];
  /** Renders a bespoke animated media block instead of the carousel. */
  showcase?: "taxy";
  link?: { href: string; label: string };
  oisMedia?: boolean;
}

const products: Product[] = [
  {
    id: "lexrech",
    name: "LexRech",
    tagline: "Law firm management for Germany",
    description:
      "A complete practice management platform for German law firms — case management, time tracking, client portal, and GDPR/DSGVO compliance, all in one place.",
    details:
      "Built specifically for the German market: XRechnung-compliant electronic invoicing, beA court communication, DATEV export, conflict checking, and a full audit trail. Multi-tenant SaaS architecture with role-based access and real-time collaboration across the firm.",
    status: "in-development",
    metrics: [
      { value: "EN 16931", label: "XRechnung compliant" },
      { value: "beA", label: "Court communication" },
      { value: "DATEV", label: "Accountant export" },
    ],
    features: [
      "XRechnung invoicing",
      "beA court integration",
      "Case management",
      "Time tracking",
      "DATEV export",
      "GDPR compliance",
    ],
    shots: [
      {
        src: "/products/lexrech-landing.png",
        alt: "LexRech landing page in German",
        caption:
          "The German-market landing page — beA, XRechnung, RVG and DATEV stated up front.",
      },
      {
        src: "/products/lexrech-dashboard.png",
        alt: "LexRech firm dashboard",
        caption:
          "Firm dashboard: active matters, unbilled hours, month-to-date revenue and the beA inbox at a glance.",
      },
      {
        src: "/products/lexrech-invoices.png",
        alt: "LexRech invoice ledger",
        caption:
          "Invoice ledger with per-invoice status, due dates and the firm's outstanding balance.",
      },
    ],
    link: { href: "https://lexrech.de", label: "Visit lexrech.de" },
  },
  {
    id: "quris",
    name: "Quris",
    tagline: "AI medical imaging for prostate cancer",
    description:
      "Deep-learning analysis of PSMA-PET/CT scans — automated lesion detection, TNM staging, and tumor burden quantification for radiologists and oncologists.",
    details:
      "Quris cuts manual scan analysis from ~30 minutes to under 1 minute. Upload a study (or push from PACS), and the platform returns whole-body lesion detection, staging, and treatment-response tracking with evidence-based reports. Built on a DICOM-native stack with an interactive 3D web viewer.",
    status: "upcoming",
    metrics: [
      { value: "~30 min → <1 min", label: "Per-study analysis" },
      { value: "Whole-body", label: "Lesion detection" },
      { value: "DICOM-native", label: "PACS integration" },
    ],
    features: [
      "Automated lesion detection",
      "TNM staging",
      "Tumor burden quantification",
      "3D DICOM viewer",
      "PACS integration",
      "Treatment response tracking",
    ],
    shots: [
      {
        src: "/products/quris-landing.png",
        alt: "Quris landing page with 3D anatomy hero",
        caption:
          "The landing page, with an interactive 3D anatomy hero driven by real PET/CT lesion data.",
      },
      {
        src: "/products/quris-viewer.png",
        alt: "Quris 3D volume rendering with tumour overlay",
        caption:
          "3D volume rendering of a whole-body study with the AI tumour overlay switched on.",
      },
      {
        src: "/products/quris-analysis.png",
        alt: "Quris AI analysis panel",
        caption:
          "AI analysis: 137 lesions detected, 1210.8 mL total tumour burden, TNM stage IVB.",
      },
      {
        src: "/products/quris-mip.png",
        alt: "Quris whole-body MIP with lesion segmentation",
        caption:
          "Whole-body MIP with skeletal lesion segmentation rendered over the projection.",
      },
      {
        src: "/products/quris-detection.png",
        alt: "Quris automated lesion detection",
        caption:
          "Automated PET/CT lesion detection with SUV quantification — no manual contouring.",
      },
    ],
  },
  {
    id: "ois",
    name: "OIS",
    tagline: "Opportunity Intelligence System",
    description:
      "An AI platform that studies proven startup models in advanced markets (Germany, USA, UK), cross-references them with local realities, and generates VC-grade opportunity dossiers for emerging markets — starting with Morocco.",
    details:
      "OIS scans, extracts, maps, scores, and compiles market research in under 5 minutes — what takes traditional market research 2–4 weeks. Each dossier is a validated, localized opportunity brief ready for investors or founders.",
    status: "upcoming",
    metrics: [
      { value: "2–4 weeks → 5 min", label: "Research cycle" },
      { value: "DE · US · UK", label: "Source markets" },
      { value: "VC-grade", label: "Dossier output" },
    ],
    features: [
      "Cross-market model analysis",
      "VC-grade opportunity dossiers",
      "Localized market mapping",
      "Opportunity scoring",
      "5-minute research cycles",
    ],
    oisMedia: true,
  },
  {
    id: "xfunds",
    name: "XFunds",
    tagline: "Fund administration for alternative investments",
    description:
      "A multi-tenant platform for managing hedge funds, private equity, venture capital, and real estate funds — from fundraising through liquidation.",
    details:
      "Full fund lifecycle management with NAV tracking, capital calls and distributions, double-entry accounting, a high-water-mark fee engine, and a rule-based compliance engine covering AIFMD, SEC, FCA, and MAS jurisdictions. Multi-currency, multi-tenant, and built for SaaS deployment.",
    status: "upcoming",
    metrics: [
      { value: "Full lifecycle", label: "Raise to liquidation" },
      { value: "Double-entry", label: "Fund accounting" },
      { value: "AIFMD · SEC · FCA", label: "Compliance engine" },
    ],
    features: [
      "Multi-tenant SaaS",
      "NAV & performance tracking",
      "Capital calls & distributions",
      "Double-entry accounting",
      "Fee engine (high-water mark)",
      "Compliance engine (AIFMD/SEC/FCA)",
    ],
    shots: [
      {
        src: "/products/xfunds-funds.png",
        alt: "XFunds fund overview",
        caption:
          "Fund overview — total AUM, committed and called capital across every fund in the book.",
      },
      {
        src: "/products/xfunds-fund-detail.png",
        alt: "XFunds fund detail with NAV and IRR",
        caption:
          "Fund detail with NAV, IRR, multiple, fee structure and investment strategy.",
      },
      {
        src: "/products/xfunds-capital-calls.png",
        alt: "XFunds capital calls",
        caption:
          "Capital calls tracked from issue through payment, with per-investor status.",
      },
      {
        src: "/products/xfunds-accounting.png",
        alt: "XFunds double-entry fund accounting",
        caption:
          "Double-entry fund accounting: chart of accounts, journals, trial balance and statements.",
      },
    ],
  },
  {
    id: "taxy",
    name: "Taxy",
    tagline: "Ride-hailing built for Morocco",
    description:
      "A real-time ride-sharing platform connecting riders and drivers across Morocco — live matching, road-following routes, and in-app payments in MAD.",
    details:
      "Built around the Moroccan market: phone-based auth, real-time driver tracking over WebSocket with Redis geo-indexing, OSRM road-following routes, in-app rider-driver chat, push notifications, and a wallet-based payment flow with promo codes.",
    status: "upcoming",
    metrics: [
      { value: "Real-time", label: "Rider ↔ driver matching" },
      { value: "OSRM", label: "Road-following routes" },
      { value: "MAD", label: "In-app wallet payments" },
    ],
    features: [
      "Real-time ride matching",
      "Live driver tracking",
      "OSRM route navigation",
      "In-app chat",
      "Wallet payments (MAD)",
      "Driver earnings dashboard",
    ],
    showcase: "taxy",
  },
];

const statusConfig: Record<
  Status,
  { label: string; dotClass: string; badgeClass: string }
> = {
  "in-development": {
    label: "In Development",
    dotClass: "bg-accent shadow-[0_0_8px_rgba(86,172,49,0.6)]",
    badgeClass: "border-accent/40 text-accent",
  },
  upcoming: {
    label: "Upcoming",
    dotClass: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]",
    badgeClass: "border-yellow-400/40 text-yellow-400",
  },
};

export default function Products() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-24">
      {/* Masthead */}
      <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
        Our products
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Five products. One engineering standard.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        0xTech is building a suite of products across legal tech, health tech,
        market intelligence, financial services, and mobility — one at a time,
        built right.
      </p>

      {/* Jump nav — sticks to the top while you scroll the page. */}
      <ProductNav
        items={products.map((p) => ({
          id: p.id,
          name: p.name,
          dotClass: statusConfig[p.status].dotClass,
        }))}
      />

      <div className="mt-16 space-y-28">
        {products.map((product, i) => {
          const config = statusConfig[product.status];
          return (
            <section key={product.id} id={product.id} className="group scroll-mt-32">
              {/* Index rule */}
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-xs text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-card-border transition-colors duration-500 group-hover:bg-accent/25" />
              </div>

              <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                {/* Left: what it is, and why you'd care */}
                <div className="lg:sticky lg:top-28">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${config.dotClass}`} />
                    <h2 className="text-2xl font-bold sm:text-3xl">{product.name}</h2>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badgeClass}`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm text-accent/80">{product.tagline}</p>

                  <p className="mt-6 text-base leading-relaxed text-foreground/75">
                    {product.description}
                  </p>

                  {/* Three things worth knowing before reading further */}
                  <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-card-border bg-card-border">
                    {product.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="bg-card-bg px-3 py-4 transition-colors duration-300 hover:bg-accent/[0.06]"
                      >
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="font-mono text-sm leading-tight font-semibold text-accent">
                          {m.value}
                        </dd>
                        <p className="mt-1.5 text-[0.7rem] leading-snug text-foreground/45">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 text-sm leading-relaxed text-foreground/50">
                    {product.details}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="cursor-default rounded-full border border-card-border px-3 py-1 text-xs text-foreground/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground/80"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {product.link && (
                      <a
                        href={product.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
                      >
                        {product.link.label} &rarr;
                      </a>
                    )}
                    {product.oisMedia && <OISMediaButtons />}
                    {!product.link && !product.oisMedia && (
                      <Link
                        href="/contact"
                        className="rounded-full border border-accent/30 px-6 py-2.5 text-xs font-semibold text-accent transition-all hover:bg-accent/10"
                      >
                        Get notified on launch
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: see it working */}
                <div>
                  {product.showcase === "taxy" ? (
                    <TaxyShowcase />
                  ) : product.shots ? (
                    <ProductCarousel
                      shots={product.shots}
                      label={`${product.name} screenshots`}
                    />
                  ) : product.oisMedia ? (
                    // OIS ships as a recorded demo and a deck rather than screens.
                    <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(var(--accent-rgb),1) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, rgba(var(--accent-rgb),1) 0 1px, transparent 1px 48px)",
                        }}
                      />
                      <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-6 px-8 text-center">
                        <p className="font-mono text-5xl font-black tracking-tight text-accent/25">
                          OIS
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-foreground/45">
                          <span className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent/70">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Recorded product demo
                          </span>
                          <span className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent/70">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            Investor pitch deck
                          </span>
                        </div>
                        <p className="max-w-sm text-xs leading-relaxed text-foreground/35">
                          Watch a dossier get built end to end, or read the deck —
                          both open in place.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-card-border bg-card-bg">
                      <div className="px-6 text-center">
                        <p className="font-mono text-4xl font-black tracking-tight text-accent/30">
                          {product.name}
                        </p>
                        <p className="mt-3 text-xs text-foreground/40">
                          Screenshots coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-28 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Want one of these for your market?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/60">
          Every product on this page started as a conversation. Tell us what
          you&apos;re trying to build and we&apos;ll tell you how we&apos;d
          approach it.
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
