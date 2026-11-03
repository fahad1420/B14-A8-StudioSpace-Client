import React from "react";
import { Search, Clock, CalendarCheck, Film } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Find the Right Space",
      description:
        "Browse daylight lofts, sound stages, podcast lounges, and workshops with details on dimensions, capacity, and available gear.",
    },
    {
      number: "02",
      icon: Clock,
      title: "Choose Your Hours",
      description:
        "Select your date and shoot hours. Pricing is transparent with clear hourly rates and refundable security deposits.",
    },
    {
      number: "03",
      icon: CalendarCheck,
      title: "Request a Booking",
      description:
        "Submit your booking request. Studio hosts review and confirm your reservation so your schedule is locked in.",
    },
    {
      number: "04",
      icon: Film,
      title: "Create & Wrap",
      description:
        "Check in for your production, complete your shoot, and download official invoices directly from your dashboard.",
    },
  ];

  return (
    <section className="py-20 bg-surface-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent block mb-2">
            Simple Booking Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How StudioSpace Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
            A straightforward process designed for photographers, filmmakers, podcasters, and creative teams.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-border bg-card p-7 shadow-subtle hover:shadow-card hover:border-accent/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-muted-foreground/40">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/70 mt-6 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    Step {step.number} of 4
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
