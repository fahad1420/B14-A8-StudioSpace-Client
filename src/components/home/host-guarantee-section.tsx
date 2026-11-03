import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, CalendarCheck, Sliders, ArrowRight } from "lucide-react";

export function HostGuaranteeSection() {
  const points = [
    {
      title: "Detailed Studio Specifications",
      desc: "Every listing includes practical measurements, ceiling heights, crew capacity limits, and equipment inventories.",
      icon: CheckCircle2,
    },
    {
      title: "Clear Hourly Pricing",
      desc: "Straightforward hourly rates with refundable security deposits clearly shown before you request a reservation.",
      icon: Sliders,
    },
    {
      title: "Reliable Scheduling",
      desc: "Our booking system prevents overlapping reservations so your confirmed shoot date and time remain protected.",
      icon: CalendarCheck,
    },
    {
      title: "Direct Host Coordination",
      desc: "Coordinate load-in times, building access, and gear questions directly with the studio manager or host.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Natural Editorial Description */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent block">
              Built for Creative Teams
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Designed around the needs of creative productions.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              Finding the right production space should not require endless back-and-forth emails, vague gear checklists, or surprise fees. StudioSpace gives creators and studio owners a clear, transparent platform to work together.
            </p>
            <div className="pt-2">
              <Link href="/add-studio">
                <Button
                  variant="accent"
                  size="lg"
                  className="rounded-full px-7 py-3.5 text-xs uppercase tracking-wider font-semibold gap-2 shadow-hover"
                >
                  <span>List Your Studio Space</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Real Customer Value Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="group rounded-2xl border border-border bg-surface-secondary/40 p-6 shadow-subtle hover:bg-card hover:border-accent/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 tracking-tight">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                      {pt.desc}
                    </p>
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
