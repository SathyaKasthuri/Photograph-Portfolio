import Link from "next/link";
import { Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-foreground">Lens & Light</p>
            <p className="mt-2 text-sm text-muted">
              Capturing moments that last forever.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <Camera size={20} />
            </a>
            <a
              href="mailto:hello@lensandlight.com"
              className="text-muted transition-colors hover:text-accent"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Lens & Light Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/gallery" className="hover:text-accent transition-colors">
              Gallery
            </Link>
            <Link href="/shop" className="hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
