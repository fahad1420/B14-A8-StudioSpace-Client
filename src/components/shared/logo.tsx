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
    sm: "text-base tracking-wider",
    md: "text-lg tracking-[0.18em]",
    lg: "text-2xl tracking-[0.22em]",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 ${className}`}
      aria-label="StudioSpace Home"
    >
      {/* Custom Vector Production Frame + Aperture Pin */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg border border-border/80 bg-surface-secondary/80 group-hover:border-accent/60 transition-colors duration-300 shadow-sm`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 text-foreground group-hover:text-accent transition-colors duration-300"
        >
          {/* Viewfinder corners */}
          <path
            d="M6 10V6H10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 10V6H22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 22V26H10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 22V26H22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Camera Aperture & Location Pin Marker */}
          <circle
            cx="16"
            cy="15"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="16"
            cy="15"
            r="1.75"
            className="fill-accent text-accent"
          />
          {/* Subtle location point marker below */}
          <path
            d="M16 20.5V23.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-serif font-bold uppercase text-foreground ${textSizes[size]} flex items-center`}>
          <span>STUDIO</span>
          <span className="text-accent ml-0.5 font-sans font-light tracking-widest text-[0.9em]">SPACE</span>
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">
            Find Your Space. Create Your Story.
          </span>
        )}
      </div>
    </Link>
  );
}
