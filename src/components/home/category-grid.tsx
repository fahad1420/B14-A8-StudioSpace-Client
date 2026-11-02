import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera, Film, Mic, Music, Palette, Sparkles } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  disciplineTag: string;
  queryParam: string;
  description: string;
  specPill: string;
  image: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "photo",
    name: "Photo Studios",
    disciplineTag: "DISCIPLINE // 01",
    queryParam: "Photo Studio",
    description: "Daylight infinity cycloramas, motorized blackout rigs, and continuous high-speed flash strobes.",
    specPill: "18FT CYC / STROBE SUITE",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    icon: Camera,
  },
  {
    id: "stage",
    name: "Sound Stages",
    disciplineTag: "DISCIPLINE // 02",
    queryParam: "Sound Stage",
    description: "Acoustically isolated stages with 400A Camlock 3-phase, vehicle elephant doors, and chroma cycs.",
    specPill: "400A CAMLOCK / NC-25",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    icon: Film,
  },
  {
    id: "podcast",
    name: "Podcast Lounges",
    disciplineTag: "DISCIPLINE // 03",
    queryParam: "Podcast Lounge",
    description: "Turnkey broadcast sets with Shure SM7B mics, multi-cam 4K switchers, and walnut acoustic slatting.",
    specPill: "4K MULTI-CAM / SM7B",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    icon: Mic,
  },
  {
    id: "music",
    name: "Music Suites",
    disciplineTag: "DISCIPLINE // 04",
    queryParam: "Music Suite",
    description: "Vocal tracking booths, analog consoles, live tracking rooms, and tuned nearfield monitoring.",
    specPill: "ANALOG CONSOLE / VOCAL BOOTH",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    icon: Music,
  },
  {
    id: "workshop",
    name: "Art Workshops",
    disciplineTag: "DISCIPLINE // 05",
    queryParam: "Workshop",
    description: "Industrial concrete labs with three-phase utility power, ventilation hoods, and prop fabrication spaces.",
    specPill: "INDUSTRIAL CONCRETE / 3-PHASE",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    icon: Palette,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-24 bg-surface-secondary/40 border-y border-border/70 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED PRODUCTION DISCIPLINES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Browse by Creative Discipline
            </h2>
          </div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-accent hover:underline mt-4 md:mt-0 group"
          >
            <span>SCOUT ALL STAGES</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 5 Distinct Editorial Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.queryParam)}`}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-subtle hover:shadow-card hover:border-accent transition-all duration-300 flex flex-col h-[340px]"
              >
                {/* Background Photography with Zoom Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Grain & Gradient Tone */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 group-hover:from-black/90 transition-colors" />
                </div>

                {/* Viewfinder Crop Marks on Hover */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <span className="font-mono text-[9px] text-accent tracking-widest">⌜</span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <span className="font-mono text-[9px] text-accent tracking-widest">⌝</span>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                      {cat.disciplineTag}
                    </span>
                  </div>

                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/15 text-[9px] font-mono tracking-wider text-accent mb-2">
                      {cat.specPill}
                    </span>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-white mb-2 flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-accent transition-opacity duration-300" />
                    </h3>
                    <p className="text-xs text-white/75 font-sans line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
