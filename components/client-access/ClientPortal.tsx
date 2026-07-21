"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Unlock, Download, Heart, Key, CheckCircle, ArrowRight } from "lucide-react";
import clientGalleries from "@/data/client-galleries.json";
import type { ClientGallery } from "@/lib/types";

export default function ClientPortal() {
  const [passcode, setPasscode] = useState("");
  const [activeGallery, setActiveGallery] = useState<ClientGallery | null>(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const match = (clientGalleries as ClientGallery[]).find(
      (g) => g.passcode.toUpperCase() === passcode.trim().toUpperCase()
    );

    if (match) {
      setActiveGallery(match);
    } else {
      setError("Invalid passcode. Try 'DEMO2026' or 'PORTRAIT2026'");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="min-h-screen bg-background py-20 px-6">
      <div className="w-full px-6 md:px-12 lg:px-16">
        {!activeGallery ? (
          <div className="max-w-md mx-auto my-16 bg-card border border-border/80 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-serif text-4xl text-foreground font-light mb-3">
              Client Private Access
            </h1>
            <p className="text-base text-muted mb-8 leading-relaxed">
              Enter your passcode below to unlock your private proofing gallery and select your high-res print favorites.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. DEMO2026)"
                  className="w-full bg-background border border-border focus:border-accent text-foreground text-center font-mono tracking-widest text-base py-3.5 px-4 rounded-lg outline-none transition-colors"
                />
                <Key className="absolute right-4 top-4 w-4 h-4 text-muted" />
              </div>

              {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full bg-accent text-background font-semibold uppercase tracking-widest text-sm py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Unlock Gallery</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/60 text-sm text-muted text-left">
              <p className="font-semibold text-foreground/90 mb-1">Demo Passcodes:</p>
              <ul className="space-y-1 font-mono text-xs">
                <li><span className="text-accent font-bold">DEMO2026</span> — Sophia & Marcus (Lake Como Wedding)</li>
                <li><span className="text-accent font-bold">PORTRAIT2026</span> — Elena Vance (Paris Editorial)</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            {/* Header for Unlocked Gallery */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-border/80">
              <div>
                <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                  <Unlock size={16} />
                  <span>Authenticated Client Portal</span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl text-foreground font-light">
                  {activeGallery.eventTitle}
                </h1>
                <p className="text-base text-muted mt-2">
                  Client: <span className="text-foreground font-medium">{activeGallery.clientName}</span> | Date: {activeGallery.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${Object.keys(favorites).length || activeGallery.photos.length} selected high-resolution master images...`)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Download size={16} />
                  <span>Download Master Gallery ({activeGallery.photos.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGallery(null)}
                  className="px-5 py-3 rounded-lg bg-card border border-border text-sm text-muted hover:text-foreground transition-colors font-medium"
                >
                  Lock Gallery
                </button>
              </div>
            </div>

            {/* Photo Proofing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeGallery.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-card border border-border/70 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <button
                      type="button"
                      onClick={() => toggleFavorite(photo.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                        favorites[photo.id]
                          ? "bg-red-500/90 text-white"
                          : "bg-black/40 text-white/70 hover:text-white hover:bg-black/70"
                      }`}
                    >
                      <Heart size={16} fill={favorites[photo.id] ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="p-4 flex items-center justify-between bg-card">
                    <span className="font-serif text-sm text-foreground">{photo.title}</span>
                    {favorites[photo.id] && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-accent">
                        <CheckCircle size={12} />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
