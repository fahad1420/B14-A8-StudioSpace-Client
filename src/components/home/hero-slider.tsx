"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  discipline: string;
  indexTag: string;
  headlineMain: string;
  headlineItalic: string;
  description: string;
  metaRig: string;
  metaAcoustic: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=85",
    discipline: "DAYLIGHT LOFTS & CYCLORAMA WALLS",
    indexTag: "PROD.INDEX // 01",
    headlineMain: "Architectural Daylight for",
    headlineItalic: "Pure Creative Vision.",
    description:
      "Step into sun-drenched industrial lofts, 18ft continuous cycloramas, and precision overhead strobe rigs designed for fashion editorials, brand campaigns, and commercial stills.",
    metaRig: "PROFOTO B10X // 18FT CYC",
    metaAcoustic: "NATURAL AMBIENT DIFFUSION",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=85",
    discipline: "CINEMA SOUNDSTAGES & MOTION SUITES",
    indexTag: "PROD.INDEX // 02",
    headlineMain: "Acoustic Stages Engineered for",
    headlineItalic: "Sound and Scale.",
    description:
      "Sound-isolated motion stages featuring 400A Camlock 3-phase power, pre-rigged lighting pipe grids, elephant door vehicle drive-in, and full green screen cyc infrastructure.",
    metaRig: "ARRI SKYPANEL S60-C RIG",
    metaAcoustic: "NC-25 SOUNDPROOF ENVELOPE",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=85",
    discipline: "BROADCAST PODCAST & AUDIO TRACKING",
    indexTag: "PROD.INDEX // 03",
    headlineMain: "Turnkey Acoustic Lounges for",
    headlineItalic: "Conversations & Sound.",
    description:
      "Multi-camera 4K podcast rooms and analog tracking suites with Shure SM7B broadcast microphones, custom walnut acoustic slatting, and instant direct-to-cloud multi-track recording.",
    metaRig: "SHURE SM7B // BLACKMAGIC 4K",
    metaAcoustic: "DIFFUSION & BASS TRAPS",
  },
];

export function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white select-none">
      {/* Precision Film Crop Mark Overlays (Viewfinder Aesthetics) */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none hidden sm:block">
        <span className="font-mono text-[10px] tracking-[0.28em] text-white/50 block">
          ⌜ REC.VIEWFINDER // RAW 4K ⌝
        </span>
      </div>
      <div className="absolute top-6 right-6 z-20 pointer-events-none hidden sm:block">
        <span className="font-mono text-[10px] tracking-[0.28em] text-accent/80 block">
          ● CALL SHEET ACTIVE
        </span>
      </div>
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:block">
        <span className="font-mono text-[9px] tracking-[0.22em] text-white/40 block">
          [ 24.00 FPS // 180.0° SHUTTER // 5600K ]
        </span>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1100}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-accent !w-2.5 !h-2.5 !opacity-60 transition-all"></span>`;
          },
        }}
        navigation={true}
        loop={true}
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        className="w-full h-[640px] sm:h-[720px] lg:h-[780px]"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Cinematic Stage Photography */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.discipline}
                fill
                priority={idx === 0}
                className="object-cover object-center scale-105 animate-in zoom-in duration-1000"
                sizes="100vw"
              />
              {/* Dual Vignette & Architectural Gradient Wash */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40" />
            </div>

            {/* Slide Content Layer */}
            <div className="relative z-10 container mx-auto h-full px-6 sm:px-12 flex flex-col justify-center">
              <div className="max-w-3xl">
                {/* Editorial Index & Discipline Tag */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-mono text-[11px] tracking-[0.22em] uppercase font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span>{slide.discipline}</span>
                  </div>

                  <span className="font-mono text-[11px] tracking-[0.25em] text-white/60">
                    {slide.indexTag}
                  </span>
                </div>

                {/* Editorial Typography Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
                  <span>{slide.headlineMain}</span>{" "}
                  <span className="italic font-normal text-accent font-serif">
                    {slide.headlineItalic}
                  </span>
                </h1>

                {/* Technical Production Synopsis */}
                <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed font-sans max-w-2xl mb-8">
                  {slide.description}
                </p>

                {/* Live Stage Technical Metadata Bar */}
                <div className="hidden sm:flex items-center gap-6 py-3 px-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 max-w-fit mb-9 font-mono text-[10.5px] text-white/75">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">RIG:</span>
                    <span>{slide.metaRig}</span>
                  </div>
                  <div className="w-px h-3.5 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">ACOUSTIC:</span>
                    <span>{slide.metaAcoustic}</span>
                  </div>
                </div>

                {/* Primary & Secondary Call to Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/studios">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-full px-8 py-4 text-xs uppercase tracking-[0.16em] font-bold shadow-hover flex items-center gap-2.5 group transition-all"
                    >
                      <span>Scout Creative Studios</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/add-studio">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-4 text-xs uppercase tracking-[0.16em] font-bold text-white border-white/30 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-md transition-all flex items-center gap-2.5"
                    >
                      <Compass className="w-4 h-4 text-accent" />
                      <span>Host Your Space</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
