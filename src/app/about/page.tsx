import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award, Shield, Users, Camera } from "lucide-react";

export const metadata = {
  title: "About Us | StudioSpace",
  description:
    "Learn about the mission, creators, and studio hosts powering StudioSpace, the premier peer-to-peer creative space rental marketplace.",
};

export default function AboutPage() {
  const values = [
    {
      code: "01",
      title: "Creator-Centric Experience",
      desc: "Built for photographers, filmmakers, podcasters, and creative teams who need exact space dimensions and clear amenity details.",
      icon: Camera,
    },
    {
      code: "02",
      title: "Transparent Hourly Rates",
      desc: "Clear per-hour rates with no hidden platform fees. Refundable security deposits are handled transparently upon booking completion.",
      icon: Shield,
    },
    {
      code: "03",
      title: "Supporting Independent Hosts",
      desc: "Studio hosts can monetize their creative spaces, fill available calendar dates, and connect with respectful creative professionals.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative bg-surface-secondary/70 border-b border-border py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission &amp; Story</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.14] mb-6">
            Connecting Creators with Inspiring Spaces.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans">
            StudioSpace is a peer-to-peer creative studio marketplace connecting photographers, filmmakers, and audio creators with professional creative workspaces.
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
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                Why We Built StudioSpace
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                Finding and booking creative production spaces has historically meant dealing with opaque pricing, slow back-and-forth emails, and missing technical details. Photographers and production crews spent hours confirming basic details like ceiling heights, lighting equipment, or load-in access.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                StudioSpace simplifies the entire process. By providing standardized studio listings with clear specs, photos, equipment lists, and upfront hourly rates, creators can book with confidence and focus on their creative work.
              </p>
              <div className="pt-2">
                <Link href="/studios">
                  <Button variant="accent" className="font-mono text-xs uppercase tracking-wider gap-2">
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Values */}
      <section className="py-20 bg-surface-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Our Values
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-accent font-semibold tracking-widest">
                        {v.code}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
