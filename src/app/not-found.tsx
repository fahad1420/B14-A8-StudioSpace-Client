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

        {/* Custom Studio Viewfinder / Camera 404 Graphic */}
        <div className="relative w-36 h-36 mx-auto rounded-3xl border-2 border-dashed border-accent/40 bg-surface-secondary flex items-center justify-center">
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-accent" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-accent" />

          <div className="text-center">
            <span className="font-serif text-5xl font-black text-accent tracking-tighter block">
              404
            </span>
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-muted-foreground block -mt-1">
              FRAME NOT FOUND
            </span>
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Out of Frame
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed font-sans">
            The creative production stage, studio link, or workspace profile you are searching for does not exist or may have been unlisted by the host.
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
