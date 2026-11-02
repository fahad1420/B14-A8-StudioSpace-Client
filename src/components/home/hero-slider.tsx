"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  categoryTag: string;
  headline: string;
  description: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "EDITORIAL CYCLORAMA & DAYLIGHT LOFTS",
    headline: "Unrivaled Natural Light for Pure Creative Vision.",
    description:
      "Step into daylight-flooded photo lofts, infinite cyclorama corners, and precision lighting rigs designed for fashion editorials, brand campaigns, and visual storytellers.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "PRODUCTION SOUNDSTAGES & MOTION SUITES",
    headline: "Cinema Stages Engineered for Sound and Scale.",
    description:
      "Acoustically isolated soundstages with camlock power, pre-rigged lighting grids, elephant doors, and chroma green walls built for commercials, music videos, and cinematic features.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "BROADCAST PODCAST & AUDIO SUITES",
    headline: "Turnkey Acoustic Lounges for Creators and Hosts.",
    description:
      "Broadcast-grade multi-cam podcast rooms and analog tracking suites with Shure SM7B microphones, bespoke acoustic timber, and instant live recording.",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-[620px] sm:h-[680px] lg:h-[750px]"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Dark Vignette & Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={slide.id === 1}
                className="object-cover object-center scale-105 animate-in zoom-in duration-1000"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            {/* Slide Content Layer */}
            <div className="relative z-10 container mx-auto h-full px-6 sm:px-12 flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                {/* Minimal Luxury Category Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-sans text-xs tracking-[0.2em] uppercase font-semibold mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>{slide.categoryTag}</span>
                </div>

                {/* Editorial Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5">
                  {slide.headline}
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans font-normal max-w-xl mb-8">
                  {slide.description}
                </p>

                {/* CTAs: Primary & Secondary navigating to /studios as requested */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/studios">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-full px-8 py-3.5 text-sm uppercase tracking-wider font-semibold shadow-hover flex items-center gap-2 group"
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/studios">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-3.5 text-sm uppercase tracking-wider font-semibold text-white border-white/30 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-md transition-all flex items-center gap-2"
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
