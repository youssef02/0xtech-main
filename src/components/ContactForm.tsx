"use client";

import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      createdAt: serverTimestamp(),
      read: false,
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/30 bg-card-bg p-10 text-center">
        <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
          <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-accent">Message sent!</h3>
        <p className="mt-2 text-sm text-foreground/60">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs text-foreground/40 transition-colors hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground/70">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-accent"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground/70">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-accent"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground/70">
          Tell us about your idea
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-accent resize-none"
          placeholder="I want to build an app that..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-center text-xs text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
