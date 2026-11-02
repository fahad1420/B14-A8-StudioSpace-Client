import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera, Film, Mic, Music, Palette } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  queryParam: string;
  description: string;
  image: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "photo",
    name: "Photo Studios",
    queryParam: "Photo Studio",
    description: "Cyc walls, daylight lofts, and precision strobe kits",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    icon: Camera,
  },
  {
    id: "stage",
    name: "Sound Stages",
    queryParam: "Sound Stage",
    description: "Soundproof motion stages, chroma screens, and heavy camlock power",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    icon: Film,
  },
  {
    id: "podcast",
    name: "Podcast Rooms",
    queryParam: "Podcast Lounge",
    description: "Broadcast Shure SM7B mics, 4K multi-cam, and acoustic timber",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    icon: Mic,
  },
  {
    id: "music",
    name: "Music Suites",
    queryParam: "Music Suite",
    description: "Vocal tracking booths, Neve consoles, and live acoustic rooms",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    icon: Music,
  },
  {
    id: "workshop",
    name: "Art Workshops",
    queryParam: "Workshop",
    description: "Industrial concrete spaces for set builds, art fabrication, and labs",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    icon: Palette,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 bg-surface-secondary/40 border-y border-border/60">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Curated Production Environments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Browse by Creative Discipline
            </h2>
          </div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline mt-4 md:mt-0 group"
          >
            <span>View All Spaces</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 5 Distinct Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.queryParam)}`}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-subtle hover:shadow-hover hover:border-accent/50 transition-all duration-300 flex flex-col h-[280px]"
              >
                {/* Background Photography with Zoom Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-colors" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-white mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/75 font-sans line-clamp-2 leading-relaxed">
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
