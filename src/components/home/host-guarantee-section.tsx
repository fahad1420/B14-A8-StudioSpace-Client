import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, CalendarCheck, Sliders, ArrowRight } from "lucide-react";

export function HostGuaranteeSection() {
  const points = [
    {
      title: "Verified Studio Facilities",
      desc: "Every listed studio includes detailed technical measurements, power drop specifications, ceiling heights, and equipment inventories.",
      icon: CheckCircle2,
    },
    {
      title: "Transparent Hourly Rates",
      desc: "Clear per-hour rental with upfront security deposits. No unexpected host service surcharges or hidden facility fees.",
      icon: Sliders,
    },
    {
      title: "Conflict-Free Reservation Engine",
      desc: "Our database prevents double-bookings by checking time overlaps across confirmed slots down to the minute.",
      icon: CalendarCheck,
    },
    {
      title: "Direct Host Collaboration",
      desc: "Direct communication between filmmakers, photographers, and studio managers for smooth load-in and wrap.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Platform Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Built by Production Crews. Engineered for Creators.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Finding the right stage shouldn&apos;t require dozens of back-and-forth emails, vague equipment checklists, or surprise utility fees. Shoot Location standardizes the creative rental experience so you can focus on making art.
            </p>
            <div className="pt-2">
              <Link href="/add-studio">
                <Button variant="accent" size="lg" className="rounded-full gap-2">
                  <span>Host Your Space Today</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="rounded-2xl border border-border bg-surface-secondary/40 p-6 shadow-subtle hover:bg-card hover:border-accent/40 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
