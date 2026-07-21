"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Disc, Sun, Video } from "lucide-react";
import gearData from "@/data/gear.json";
import type { GearItem } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "All Gear", icon: Camera },
  { id: "bodies", label: "Bodies", icon: Camera },
  { id: "lenses", label: "Glass & Lenses", icon: Disc },
  { id: "lighting", label: "Lighting", icon: Sun },
  { id: "drone", label: "Aerial & Accessories", icon: Video },
];

export default function GearBag() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const items = (gearData as GearItem[]).filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section className="py-24 bg-card/40 border-t border-border/60">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-3">
            Craft & Equipment
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
            Inside The Camera Bag
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">
            Every camera body, medium format sensor, and prime lens is meticulously selected to deliver uncompromised optical clarity and emotional color rendering.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all border ${
                    isActive
                      ? "bg-accent text-background border-accent shadow-lg shadow-accent/10"
                      : "bg-card text-muted border-border hover:text-foreground hover:border-border/80"
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-card border border-border/70 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-background/50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest font-mono text-accent bg-background/80 backdrop-blur-md px-3 py-1 rounded border border-accent/20 font-semibold">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-foreground font-medium group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm font-mono text-accent/90 mt-1">{item.spec}</p>
                  <p className="text-sm text-muted leading-relaxed mt-3">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 text-xs text-foreground/90">
                  <span className="text-muted font-medium">Primary Use: </span>
                  <span className="italic">{item.favoriteFor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
