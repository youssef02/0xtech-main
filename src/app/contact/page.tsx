import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an app idea? Tell us about it — 0xTech will get back to you within 24 hours with a plan.",
  openGraph: {
    title: "Contact — 0xTech",
    description: "Have an app idea? Tell us about it — 0xTech will get back to you within 24 hours with a plan.",
    url: "https://0xtech.dev/contact",
  },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-4 text-sm font-mono tracking-widest text-accent uppercase">
        Start a project
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Tell us what you want to build.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        No commitment, no jargon — just tell us your idea and we&apos;ll get
        back to you within 24 hours with how we can help.
      </p>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <ContactForm />

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-card-border bg-card-bg p-6">
            <h2 className="text-lg font-semibold">What happens next?</h2>
            <ol className="mt-4 space-y-3 text-sm text-foreground/60">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent">1.</span>
                We read your message and review your idea.
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent">2.</span>
                We reply within 24h with questions or a rough plan.
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent">3.</span>
                We hop on a free call to discuss scope, timeline, and budget.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Email us directly</h2>
            <a
              href="mailto:contactus@0xtech.dev"
              className="mt-1 block font-mono text-sm text-accent transition-colors hover:text-accent-dim"
            >
              contactus@0xtech.dev
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="mt-1 text-sm text-foreground/60">
              Remote-first, serving clients worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
