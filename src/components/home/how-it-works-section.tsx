import React from "react";
import { Search, Clock, ShieldCheck, Film } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Discover Spaces",
      description:
        "Filter daylight cycloramas, soundproof stages, and broadcast lounges by location, hourly rate, and gear inventory.",
    },
    {
      number: "02",
      icon: Clock,
      title: "Select Shoot Hours",
      description:
        "Choose your call date and exact production hours. The system automatically calculates duration and refundable deposits.",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Book Instantly",
      description:
        "Submit your reservation with protected dates. Hosts confirm time slots with zero double-booking conflicts.",
    },
    {
      number: "04",
      icon: Film,
      title: "Create & Produce",
      description:
        "Check into your private production studio equipped with continuous strobes, vanity suites, and camlock power.",
    },
  ];

  return (
    <section className="py-24 bg-surface-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Frictionless Rental Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            How StudioSpace Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From initial creative concept to final wrap, our booking architecture is tailored exclusively to the realities of commercial and independent production.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-border bg-card p-7 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-3xl font-extrabold text-muted-foreground/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="h-1 w-12 bg-accent/40 rounded-full mt-6" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
