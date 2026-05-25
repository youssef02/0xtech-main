export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-foreground/50 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} <span className="font-mono font-semibold">0xTech</span>. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="mailto:contactus@0xtech.dev" className="transition-colors hover:text-accent">
            contactus@0xtech.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
