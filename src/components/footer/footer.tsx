"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { miscApi } from "@/lib/api";
import { toast } from "sonner";
import { ArrowRight, Instagram, Youtube, Linkedin, ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await miscApi.subscribeNewsletter(email);
      toast.success(res.message || "Thank you for subscribing to StudioSpace Dispatch!");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Could not complete subscription. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { label: "Photo Studios", href: "/studios?category=Photo+Studio" },
    { label: "Sound Stages", href: "/studios?category=Sound+Stage" },
    { label: "Podcast Rooms", href: "/studios?category=Podcast+Lounge" },
    { label: "Music Suites", href: "/studios?category=Music+Suite" },
    { label: "Art Workshops", href: "/studios?category=Workshop" },
  ];

  const quickLinks = [
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Host Your Space", href: "/add-studio" },
    { label: "Operations Dashboard", href: "/dashboard" },
  ];

  const standards = [
    { label: "Acoustic Standards (NC-25)", href: "/how-it-works" },
    { label: "Camlock Power Specifications", href: "/how-it-works" },
    { label: "Conflict-Free DB Engine", href: "/about" },
    { label: "Direct Host Walkthrough", href: "/about" },
  ];

  return (
    <footer className="w-full bg-surface-secondary/70 border-t border-border mt-auto">
      {/* Top Editorial Dispatch Bar */}
      <div className="border-b border-border/60 bg-surface-secondary">
        <div className="container mx-auto px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-accent flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STUDIOSPACE DISPATCH // PRODUCTION INTELLIGENCE</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Stay tuned for premier stage openings &amp; creative gear alerts.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                Weekly curated studio drops, daylight loft availability, and production technical bulletins delivered directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <Input
                  type="email"
                  placeholder="Enter producer or filmmaker email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card text-foreground placeholder:text-muted-foreground/60 border-border h-11 text-xs"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="accent"
                  className="h-11 px-6 rounded-lg text-xs uppercase tracking-wider font-semibold shrink-0 gap-2"
                >
                  <span>{isSubmitting ? "Connecting..." : "Subscribe"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Colophon */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Logo size="lg" showTagline />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm pt-1">
              StudioSpace is the peer-to-peer creative workspace rental marketplace engineered for photographers, commercial filmmakers, podcasters, and sound designers. Discover and secure professional stages with verified facilities and hourly booking.
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 block mb-2">
                CREATIVE NETWORK CHANNELS
              </span>
              {/* Social Channels with Authentic X Icon */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-all duration-200"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Disciplines */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground font-semibold mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-muted-foreground hover:text-accent transition-colors block"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Charter */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground font-semibold mb-4">
              Charter
            </h4>
            <ul className="space-y-2.5 text-xs">
              {standards.map((std) => (
                <li key={std.label}>
                  <Link
                    href={std.href}
                    className="text-muted-foreground hover:text-accent transition-colors block"
                  >
                    {std.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Colophon and Security Row */}
        <div className="pt-10 mt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px]">
              &copy; {new Date().getFullYear()} StudioSpace Platform.
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider text-muted-foreground/80">
              PROGRAMMING HERO ASSIGNMENT 8 (B14-A8)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground/90 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>HTTPOnly JWT / ISO Encrypted</span>
            </span>
            <Link href="/about" className="hover:text-accent transition-colors">
              Charter
            </Link>
            <Link href="/how-it-works" className="hover:text-accent transition-colors">
              Workflow
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
