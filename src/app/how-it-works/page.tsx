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
      code: "DISCOVERY & SPECS",
      title: "Discover & Filter Vetted Spaces",
      desc: "Search by production discipline (Photo Studio, Sound Stage, Podcast Lounge, Music Suite, Workshop), target location, and hourly budget. Every profile showcases high-resolution photography, ceiling clear heights, and gear inventory.",
      icon: Search,
    },
    {
      num: "02",
      code: "FACILITY AUDIT",
      title: "Inspect Technical Inventories",
      desc: "Verify camlock 3-phase power ratings, cyclorama dimensions, acoustic isolation coefficients (NC ratings), makeup vanity counts, and loading dock access before booking.",
      icon: Sliders,
    },
    {
      num: "03",
      code: "HOURLY CALCULATION",
      title: "Select Exact Production Hours",
      desc: "Specify your call date, load-in time, and wrap time. The reservation engine automatically computes exact duration, rental fees, and refundable security deposits.",
      icon: Clock,
    },
    {
      num: "04",
      code: "CALL SHEET DISPATCH",
      title: "Submit Instant Request",
      desc: "Your reservation is protected against double-booking conflicts. Studio hosts review and confirm your shoot, issuing an official booking confirmation and accounting invoice.",
      icon: ShieldCheck,
    },
  ];

  const hostSteps = [
    {
      num: "01",
      code: "STAGE PROFILE",
      title: "Create Your Studio Profile",
      desc: "Publish your stage specifications, photo gallery, available strobe/lighting equipment, and amenities with custom hourly pricing and security deposit policies.",
      icon: Building,
    },
    {
      num: "02",
      code: "DISPATCH INTAKE",
      title: "Receive & Approve Requests",
      desc: "Review incoming production inquiries with full creator information, crew notes, and requested time slots right inside your Host Dashboard.",
      icon: Calendar,
    },
    {
      num: "03",
      code: "WRAP & PAYOUT",
      title: "Host & Inspect Load-Out",
      desc: "Welcome verified creators to your facility. Mark sessions completed upon wrap inspection to release deposits and earn hourly rental payouts.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-surface-secondary/70 border-b border-border py-20 text-center relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono uppercase tracking-[0.24em] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLATFORM PROTOCOL &amp; DISPATCH</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.14] mb-6">
            How StudioSpace Operates
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans">
            From preliminary treatment to final wrap, explore how our peer-to-peer marketplace streamlines creative workspace bookings.
          </p>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.24em] text-accent mb-2">
              CREATOR WORKFLOW PROTOCOL
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              For Directors, Photographers &amp; Crews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {creatorSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-border bg-card p-7 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-accent tracking-widest">
                        {step.num} // {step.code}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/studios">
              <Button variant="accent" size="lg" className="rounded-full px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold gap-2 shadow-hover">
                <span>Browse Production Stages</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Hosts */}
      <section className="py-20 bg-surface-secondary/40 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.24em] text-accent mb-2">
              HOST OPERATIONS PROTOCOL
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              For Studio Owners &amp; Stage Managers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hostSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-border bg-card p-7 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-accent tracking-widest">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/add-studio">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold gap-2">
                <span>List Your Studio Facility</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
