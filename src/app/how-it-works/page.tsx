import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Sliders,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Building,
} from "lucide-react";

export const metadata = {
  title: "How It Works | StudioSpace",
  description:
    "Learn how StudioSpace connects creative directors and production teams with premier photo studios, film stages, and recording suites.",
};

export default function HowItWorksPage() {
  const creatorSteps = [
    {
      num: "01",
      title: "Discover & Filter Vetted Spaces",
      desc: "Search by production category (Photo Studio, Sound Stage, Podcast Lounge, Music Suite, Workshop), target location, and hourly budget. Every profile showcases high-resolution photography, ceiling clear heights, and gear inventory.",
      icon: Search,
    },
    {
      num: "02",
      title: "Inspect Technical Inventories",
      desc: "Verify camlock 3-phase power ratings, cyclorama dimensions, acoustic isolation coefficients (NC ratings), makeup vanity counts, and loading dock access before booking.",
      icon: Sliders,
    },
    {
      num: "03",
      title: "Select Exact Production Hours",
      desc: "Specify your call date, load-in time, and wrap time. The reservation engine automatically computes exact duration, rental fees, and refundable security deposits.",
      icon: Clock,
    },
    {
      num: "04",
      title: "Submit Instant Request",
      desc: "Your reservation is protected against double-booking conflicts. Studio hosts review and confirm your shoot, issuing an official booking confirmation and accounting invoice.",
      icon: ShieldCheck,
    },
  ];

  const hostSteps = [
    {
      num: "01",
      title: "Create Your Studio Profile",
      desc: "Publish your stage specifications, photo gallery, available strobe/lighting equipment, and amenities with custom hourly pricing and security deposit policies.",
      icon: Building,
    },
    {
      num: "02",
      title: "Receive & Approve Requests",
      desc: "Review incoming production inquiries with full creator information, crew notes, and requested time slots right inside your Host Dashboard.",
      icon: Calendar,
    },
    {
      num: "03",
      title: "Host & Inspect Load-Out",
      desc: "Welcome verified creators to your facility. Mark sessions completed upon wrap inspection to release deposits and earn hourly rental payouts.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-surface-secondary/70 border-b border-border py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Guide</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
            How StudioSpace Works
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From initial discovery to load-out wrap, explore how our peer-to-peer marketplace streamlines creative workspace reservations.
          </p>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Creator Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              For Directors, Photographers & Crews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {creatorSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-border bg-card p-8 shadow-subtle hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-serif text-3xl font-extrabold text-muted-foreground/30">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Hosts */}
      <section className="py-20 bg-surface-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Host Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              For Studio Owners & Stage Managers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hostSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-border bg-card p-7 shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-serif text-3xl font-extrabold text-muted-foreground/30">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Start Your Next Production with StudioSpace
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Browse hundreds of photo lofts, infinite cycloramas, podcast stages, and recording rooms today.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/studios">
              <Button variant="accent" size="lg" className="rounded-full gap-2">
                <span>Explore Studios</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
