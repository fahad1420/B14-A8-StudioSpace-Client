import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, CalendarCheck, Sliders, ArrowRight, Sparkles } from "lucide-react";

export function HostGuaranteeSection() {
  const points = [
    {
      code: "STANDARD // 01",
      title: "Verified Studio Facilities",
      desc: "Every listed space features verified technical specs: ceiling heights, electrical power drops (Camlock/3-Phase), acoustic isolation ratings, and equipment inventories.",
      icon: CheckCircle2,
    },
    {
      code: "STANDARD // 02",
      title: "Transparent Hourly Accounting",
      desc: "Honest per-hour rental with upfront, fully refundable security deposits. Zero unexpected platform markups or undisclosed utility surcharges.",
      icon: Sliders,
    },
    {
      code: "STANDARD // 03",
      title: "Conflict-Free DB Engine",
      desc: "Our booking system prevents double-bookings by checking time overlaps across confirmed slots down to the exact minute with distributed locking.",
      icon: CalendarCheck,
    },
    {
      code: "STANDARD // 04",
      title: "Direct Host Walkthrough",
      desc: "Direct communication between filmmakers, photographers, and studio managers for smooth load-in, facility orientation, and crew wrap.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Production Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARCHITECTURAL CHARTER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.14]">
              Built by Production Crews. Engineered for Creators.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              Finding the right stage shouldn&apos;t require dozens of back-and-forth emails, vague equipment checklists, or surprise utility fees. StudioSpace standardizes the creative rental experience so your crew can focus entirely on craft.
            </p>
            <div className="pt-2">
              <Link href="/add-studio">
                <Button
                  variant="accent"
                  size="lg"
                  className="rounded-full px-7 py-3.5 text-xs font-mono uppercase tracking-[0.16em] font-semibold gap-2.5 shadow-hover"
                >
                  <span>Host Your Studio Space</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Core Technical Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="group rounded-2xl border border-border bg-surface-secondary/40 p-6 shadow-subtle hover:bg-card hover:border-accent/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9.5px] uppercase tracking-widest text-accent font-semibold">
                        {pt.code}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 tracking-tight">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                      {pt.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 mt-5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                      VERIFIED SPEC
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
