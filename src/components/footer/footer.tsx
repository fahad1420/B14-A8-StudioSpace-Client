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
      toast.success(res.message || "Thank you for subscribing to StudioSpace updates!");
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

  const exploreLinks = [
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "List Your Space", href: "/add-studio" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const supportLinks = [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Support", href: "mailto:support@studiospace.com" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-surface-secondary/60 border-t border-border mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Stay updated on new studio spaces
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                Receive occasional updates about new creative spaces, daylight lofts, and platform features.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card text-foreground placeholder:text-muted-foreground/60 border-border h-11 text-sm"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="accent"
                  className="h-11 px-6 rounded-lg text-xs font-semibold shrink-0 gap-2 uppercase tracking-wider"
                >
                  <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <Logo size="lg" showTagline />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm pt-1">
              StudioSpace is a peer-to-peer rental marketplace that connects photographers, filmmakers, podcasters, and musicians with creative workspaces available by the hour.
            </p>

            <div className="pt-2">
              <span className="text-xs font-medium text-foreground block mb-2">
                Connect with us
              </span>
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

          {/* Explore Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
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

          {/* Studio Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
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

          {/* Support & Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 mt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StudioSpace. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/how-it-works" className="hover:text-accent transition-colors">
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
