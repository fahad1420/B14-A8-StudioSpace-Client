import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award, Shield, Users, Camera } from "lucide-react";

export const metadata = {
  title: "About Us | SHOOT LOCATION",
  description:
    "Learn about the mission, creators, and studio hosts powering Shoot Location, the premier peer-to-peer creative space rental marketplace.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Creator-Centric Architecture",
      desc: "Built from the ground up for commercial photographers, indie cinematographers, podcasters, and sound designers who require exact technical specifications.",
      icon: Camera,
    },
    {
      title: "Honest & Transparent Pricing",
      desc: "Clear per-hour reservations without hidden facility surcharges or surprise load-in fees. Transparent security deposits refunded upon wrap inspection.",
      icon: Shield,
    },
    {
      title: "Empowering Independent Stage Owners",
      desc: "Studio hosts can monetize their physical real estate, fill dark days between commercial bookings, and connect with premier creative talent.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative bg-surface-secondary/70 border-b border-border py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
            Democratizing Access to World-Class Creative Workspaces.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Shoot Location is a peer-to-peer creative marketplace connecting directors, photographers, and audio engineers with professional production studios.
          </p>
        </div>
      </section>

      {/* Editorial Narrative Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-card bg-black">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                alt="Production Studio Loft"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The Inception
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                Why We Built Shoot Location
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For decades, renting professional production stages meant navigating opaque price quotes, broker gatekeepers, and incomplete technical specs. Independent photographers and digital production crews wasted hours negotiating load-in hours, finding camlock power ratings, and guessing if natural light would hold.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Shoot Location was engineered to solve this friction. By standardizing stage listings with verified ceiling heights, power drops, acoustic ratings, and transparent hourly rates, we give creators the freedom to focus entirely on visual storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Values */}
      <section className="py-20 bg-surface-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-card p-7 shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-surface-secondary to-card p-10 sm:p-14 text-center shadow-card space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Book Your Next Production Space?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Join thousands of filmmakers, photographers, and audio designers discovering exceptional spaces daily.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/studios">
                <Button variant="accent" size="lg" className="rounded-full gap-2">
                  <span>Explore All Studios</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/add-studio">
                <Button variant="outline" size="lg" className="rounded-full">
                  Host Your Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
