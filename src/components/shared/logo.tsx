import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className = "", size = "md", showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base tracking-[0.16em]",
    md: "text-lg tracking-[0.18em]",
    lg: "text-2xl tracking-[0.22em]",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-all duration-300 hover:opacity-95 ${className}`}
      aria-label="StudioSpace Home"
    >
      {/* Precision Viewfinder & Optical Aperture Emblem */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg border border-border/80 bg-surface-secondary/90 group-hover:border-accent transition-all duration-300 shadow-sm`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 text-foreground group-hover:text-accent transition-colors duration-300"
        >
          {/* Architectural Viewfinder Corners */}
          <path
            d="M5 9V5H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 9V5H23"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 23V27H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 23V27H23"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Camera Aperture Blades & Location Lens Marker */}
          <circle
            cx="16"
            cy="16"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.25"
            className="opacity-70"
          />
          <circle
            cx="16"
            cy="16"
            r="2"
            className="fill-accent text-accent"
          />
          {/* Subtle Reticle Crosshairs */}
          <line x1="16" y1="8" x2="16" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="16" y1="22" x2="16" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="8" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="22" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-serif font-bold uppercase text-foreground ${textSizes[size]} flex items-center leading-none`}>
          <span>STUDIO</span>
          <span className="text-accent ml-1 font-sans font-light tracking-[0.24em] text-[0.88em]">SPACE</span>
        </div>
        {showTagline ? (
          <span className="text-[9.5px] uppercase tracking-[0.28em] text-muted-foreground font-mono mt-1">
            Find Your Space. Create Your Story.
          </span>
        ) : (
          <span className="text-[8.5px] uppercase tracking-[0.24em] text-muted-foreground/70 font-mono mt-1 hidden sm:block">
            CREATIVE STAGES // EST. 2026
          </span>
        )}
      </div>
    </Link>
  );
}
