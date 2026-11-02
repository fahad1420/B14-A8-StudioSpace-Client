import React from "react";
import { Search, Clock, ShieldCheck, Film, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      phase: "PHASE 01",
      code: "SCOUT & SPECS",
      icon: Search,
      title: "Scout Creative Stages",
      description:
        "Filter daylight cycloramas, soundproof motion stages, and broadcast lounges by location, power distribution, ceiling height, and gear inventory.",
    },
    {
      phase: "PHASE 02",
      code: "CALL SHEET",
      icon: Clock,
      title: "Schedule Call Hours",
      description:
        "Select your shoot date and exact hourly window. Our booking engine calculates transparent rental totals, refundable security deposits, and load-in buffers.",
    },
    {
      phase: "PHASE 03",
      code: "DISPATCH LOCK",
      icon: ShieldCheck,
      title: "Conflict-Free Reservation",
      description:
        "Submit your reservation request. Distributed database locks prevent concurrent booking collisions so your production call date remains protected.",
    },
    {
      phase: "PHASE 04",
      code: "LOAD-IN & WRAP",
      icon: Film,
      title: "Produce & Wrap",
      description:
        "Check into your private production studio equipped with continuous flash strobes, vanity suites, and camlock power. Download PDF invoices upon completion.",
    },
  ];

  return (
    <section className="py-24 bg-surface-secondary/50 border-t border-border relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-accent mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRODUCTION DISPATCH PROTOCOL</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            How StudioSpace Operates
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
            From preliminary treatment to final wrap, our booking architecture is engineered exclusively for the operational realities of commercial photo, film, and audio production.
          </p>
        </div>

        {/* 4 Steps Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.phase}
                className="group relative rounded-2xl border border-border bg-card p-7 shadow-subtle hover:shadow-card hover:border-accent/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Crop mark aesthetics */}
                <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="font-mono text-[9px] text-accent">⌜</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="font-mono text-[9px] text-accent">⌝</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-accent block">
                        {step.phase}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider block">
                        {step.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/70 mt-6 flex items-center justify-between">
                  <span className="font-mono text-[9.5px] uppercase tracking-widest text-muted-foreground/70">
                    STAGE PROTOCOL
                  </span>
                  <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
