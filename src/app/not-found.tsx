import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <Logo size="lg" className="justify-center" />

        {/* 404 Display */}
        <div className="relative w-36 h-36 mx-auto rounded-3xl border border-border bg-surface-secondary flex items-center justify-center">
          <div className="text-center">
            <span className="font-serif text-5xl font-black text-accent tracking-tighter block">
              404
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block -mt-1">
              Page Not Found
            </span>
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed font-sans">
            The page or studio you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-mono text-xs">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="accent" className="w-full gap-2 uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>

          <Link href="/studios" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-accent" />
              <span>Explore Studios</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
