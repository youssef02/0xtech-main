import type { Metadata } from "next";
import Link from "next/link";
import OISMediaButtons from "@/components/OISMediaButtons";

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
  description: string;
  details: string;
  status: Status;
  features: string[];
  images?: { src: string; alt: string }[];
  link?: { href: string; label: string };
  oisMedia?: boolean;
  placeholder?: boolean;
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
    features: [
      "XRechnung invoicing",
      "beA court integration",
      "Case management",
      "Time tracking",
      "DATEV export",
      "GDPR compliance",
    ],
    images: [
      { src: "/products/lexrech-landing.png", alt: "LexRech landing page" },
      { src: "/products/lexrech-dashboard.png", alt: "LexRech dashboard" },
      { src: "/products/lexrech-invoices.png", alt: "LexRech XRechnung invoicing" },
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
    features: [
      "Automated lesion detection",
      "TNM staging",
      "Tumor burden quantification",
      "3D DICOM viewer",
      "PACS integration",
      "Treatment response tracking",
    ],
    images: [
      { src: "/products/quris-landing.png", alt: "Quris landing page" },
      { src: "/products/quris-viewer.png", alt: "Quris 3D DICOM viewer" },
      { src: "/products/quris-analysis.png", alt: "Quris AI analysis" },
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
    features: [
      "Multi-tenant SaaS",
      "NAV & performance tracking",
      "Capital calls & distributions",
      "Double-entry accounting",
      "Fee engine (high-water mark)",
      "Compliance engine (AIFMD/SEC/FCA)",
    ],
    placeholder: true,
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
    features: [
      "Real-time ride matching",
      "Live driver tracking",
      "OSRM route navigation",
      "In-app chat",
      "Wallet payments (MAD)",
      "Driver earnings dashboard",
    ],
    images: [
      { src: "/products/taxy-app.png", alt: "Taxy mobile app preview" },
    ],
  },
];

const statusConfig: Record<
  Status,
  { label: string; dotClass: string; badgeClass: string }
> = {
  "in-development": {
    label: "In Development",
    dotClass: "bg-accent shadow-[0_0_8px_rgba(0,255,136,0.6)]",
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
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
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

      <div className="mt-20 space-y-24">
        {products.map((product) => {
          const config = statusConfig[product.status];
          return (
            <section
              key={product.id}
              id={product.id}
              className="scroll-mt-24"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${config.dotClass}`}
                />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {product.name}
                </h2>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badgeClass}`}
                >
                  {config.label}
                </span>
              </div>
              <p className="mt-2 font-mono text-sm text-accent/80">
                {product.tagline}
              </p>

              {/* Content */}
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
                <div>
                  <p className="text-base leading-relaxed text-foreground/70">
                    {product.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                    {product.details}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-card-border px-3 py-1 text-xs text-foreground/50"
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
                        className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
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

                {/* Media */}
                <div>
                  {product.images ? (
                    <div className="space-y-4">
                      {product.images.map((img) => (
                        <div
                          key={img.src}
                          className="overflow-hidden rounded-2xl border border-card-border bg-card-bg"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        </div>
                      ))}
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
      <div className="mt-24 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10 text-center">
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
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
