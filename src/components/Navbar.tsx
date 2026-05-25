"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="logo-group flex items-center gap-1 font-mono text-2xl font-black tracking-tight">
          <span className="logo-badge inline-flex items-center justify-center rounded-lg bg-accent px-2.5 py-1 text-background text-base font-bold tracking-widest">
            0x
          </span>
          <span className="logo-text text-foreground">Tech</span>
        </Link>
        <ul className="flex gap-8 text-sm font-medium">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors hover:text-accent ${
                  pathname === href ? "text-accent" : "text-foreground/70"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
