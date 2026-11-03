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
      title: "Discover Creative Spaces",
      desc: "Search by category (Photo Studio, Sound Stage, Podcast Lounge, Music Suite, Workshop), location, and hourly rate. View high-resolution photos, capacity, and included equipment.",
      icon: Search,
    },
    {
      num: "02",
      title: "Check Amenities & Details",
      desc: "Review room dimensions, lighting setups, power options, makeup stations, and parking access to ensure the space fits your project requirements.",
      icon: Sliders,
    },
    {
      num: "03",
      title: "Choose Date & Time",
      desc: "Pick your reservation date and select start and end hours. Duration, hourly fees, and refundable security deposit are calculated automatically.",
      icon: Clock,
    },
    {
      num: "04",
      title: "Request Reservation",
      desc: "Submit your reservation request. Hosts review and confirm your session, and you receive an official confirmation and PDF invoice upon approval.",
      icon: ShieldCheck,
    },
  ];

  const hostSteps = [
    {
      num: "01",
      title: "Create Your Listing",
      desc: "Add your studio photos, write an overview, select available gear and amenities, and set your hourly rate and refundable security deposit.",
      icon: Building,
    },
    {
      num: "02",
      title: "Review Booking Requests",
      desc: "Receive incoming booking inquiries with creator information and project notes directly inside your dashboard. Confirm or decline with one click.",
      icon: Calendar,
    },
    {
      num: "03",
      title: "Host & Earn",
      desc: "Welcome creators to your space. Mark sessions completed when the shoot wraps to release deposits and keep your calendar organized.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-surface-secondary/70 border-b border-border py-20 text-center relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple &amp; Transparent</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.14] mb-6">
            How StudioSpace Works
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans">
            Whether you&apos;re booking a creative space for a photo shoot or hosting creative professionals, StudioSpace makes the process straightforward.
          </p>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              For Creators
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              For Photographers, Filmmakers &amp; Creators
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
                        {step.num}
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
                <span>Explore Studios</span>
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
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              For Hosts
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              For Studio Owners &amp; Space Hosts
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
                <span>List Your Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
