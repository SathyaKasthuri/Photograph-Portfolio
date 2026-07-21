"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Check, Sparkles, ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";
import type { ServicePackage } from "@/lib/types";

export default function InvestmentCalculator() {
  const packages = servicesData as ServicePackage[];
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(packages[0]);
  const [extraHours, setExtraHours] = useState(0);
  const [hasSecondShooter, setHasSecondShooter] = useState(true);
  const [hasHeirloomAlbum, setHasHeirloomAlbum] = useState(false);
  const [hasRawFiles, setHasRawFiles] = useState(false);

  // Price calculations
  const basePrice = selectedPackage.startingPrice;
  const extraHoursCost = extraHours * 250;
  const secondShooterCost = hasSecondShooter ? 500 : 0;
  const albumCost = hasHeirloomAlbum ? 750 : 0;
  const rawCost = hasRawFiles ? 400 : 0;
  const totalCost = basePrice + extraHoursCost + secondShooterCost + albumCost + rawCost;

  return (
    <section className="py-20 bg-card/30 border-y border-border/70">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-accent text-sm font-semibold uppercase tracking-[0.25em] mb-3">
            <Calculator size={16} />
            <span>Interactive Quote Estimator</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
            Custom Coverage & Investment Calculator
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">
            Select your desired photography service and tailored add-ons to estimate your investment in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Package Selector */}
            <div>
              <label className="block text-sm uppercase tracking-widest text-accent font-semibold mb-3">
                1. Select Photography Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      selectedPackage.id === pkg.id
                        ? "bg-accent/10 border-accent text-foreground shadow-md"
                        : "bg-background border-border text-muted hover:border-border/80 hover:text-foreground"
                    }`}
                  >
                    <div className="font-serif text-lg font-medium text-foreground">{pkg.title}</div>
                    <div className="text-sm text-accent mt-1 font-mono">${pkg.startingPrice.toLocaleString()} base</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Hours Slider */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider mb-2">
                <span className="text-accent">2. Additional Hours (+ $250 / hr)</span>
                <span className="font-mono text-foreground">{extraHours} Extra Hours</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={extraHours}
                onChange={(e) => setExtraHours(parseInt(e.target.value))}
                className="w-full accent-accent bg-border h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Add-ons Checkboxes */}
            <div className="space-y-3">
              <label className="block text-sm uppercase tracking-widest text-accent font-semibold mb-3">
                3. Tailored Add-Ons & Upgrades
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-background cursor-pointer hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasSecondShooter}
                    onChange={(e) => setHasSecondShooter(e.target.checked)}
                    className="accent-accent w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Senior Second Photographer</div>
                    <div className="text-xs text-muted">Ensures dual angle ceremony and reaction coverage</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-accent font-semibold">+$500</span>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-background cursor-pointer hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasHeirloomAlbum}
                    onChange={(e) => setHasHeirloomAlbum(e.target.checked)}
                    className="accent-accent w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Custom Italian Linen Heirloom Album</div>
                    <div className="text-xs text-muted">30-page flush-mount leather or velvet photo album</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-accent font-semibold">+$750</span>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-background cursor-pointer hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasRawFiles}
                    onChange={(e) => setHasRawFiles(e.target.checked)}
                    className="accent-accent w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Uncompressed Camera RAW Archives</div>
                    <div className="text-xs text-muted">Full unedited 61MP RAW file archive export</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-accent font-semibold">+$400</span>
              </label>
            </div>
          </div>

          {/* Live Quote Summary Column */}
          <div className="lg:col-span-5 bg-card border border-accent/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                <Sparkles size={16} />
                <span>Estimated Summary</span>
              </div>
              <h3 className="font-serif text-3xl text-foreground font-light mb-6">
                {selectedPackage.title}
              </h3>

              <div className="space-y-3 text-sm border-b border-border/80 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted">Base Package:</span>
                  <span className="font-mono text-foreground font-semibold">${basePrice.toLocaleString()}</span>
                </div>
                {extraHours > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Extra Hours ({extraHours}):</span>
                    <span className="font-mono text-foreground">+${extraHoursCost}</span>
                  </div>
                )}
                {hasSecondShooter && (
                  <div className="flex justify-between">
                    <span className="text-muted">Second Photographer:</span>
                    <span className="font-mono text-foreground">+$500</span>
                  </div>
                )}
                {hasHeirloomAlbum && (
                  <div className="flex justify-between">
                    <span className="text-muted">Heirloom Album:</span>
                    <span className="font-mono text-foreground">+$750</span>
                  </div>
                )}
                {hasRawFiles && (
                  <div className="flex justify-between">
                    <span className="text-muted">RAW Camera Archive:</span>
                    <span className="font-mono text-foreground">+$400</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-8">
                <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Included Deliverables:</div>
                {selectedPackage.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-foreground/90">
                    <Check size={16} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between mb-6 pt-4 border-t border-border">
                <span className="text-base font-semibold uppercase tracking-wider text-muted">Total Quote</span>
                <span className="font-serif text-4xl font-light text-accent font-mono">
                  ${totalCost.toLocaleString()}
                </span>
              </div>

              <Link
                href={`/contact?package=${encodeURIComponent(selectedPackage.title)}&quote=${totalCost}`}
                className="w-full bg-accent text-background font-semibold uppercase tracking-widest text-sm py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                <span>Inquire & Book Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
