"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { miscApi } from "@/lib/api";
import { toast } from "sonner";
import { ArrowRight, Instagram, Youtube, Linkedin } from "lucide-react";

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
      toast.success(res.message || "Thank you for subscribing to StudioSpace!");
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
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <footer className="w-full bg-surface-secondary border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 flex flex-col space-y-4 pr-0 lg:pr-6">
            <Logo size="lg" showTagline />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm pt-2">
              StudioSpace is the premium peer-to-peer workspace marketplace engineered for photographers, filmmakers, podcasters, and sound designers. Discover and rent professional creative stages with verified facilities and flexible hourly booking.
            </p>
            {/* Social Icons (with real current X logo) */}
            <div className="flex items-center gap-3 pt-3">
              {/* Modern X (formerly Twitter) Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Categories */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground tracking-wide mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground tracking-wide mb-2">
              Creative Digest
            </h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Curated studio drops, seasonal gear previews, and production lighting guides.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="creator@production.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card text-xs h-9"
              />
              <Button
                type="submit"
                variant="accent"
                size="sm"
                className="w-full flex items-center justify-center gap-1.5 h-9"
                isLoading={isSubmitting}
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} STUDIOSPACE. All rights reserved. Peer-to-Peer Creative Studio Marketplace.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Rental</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
