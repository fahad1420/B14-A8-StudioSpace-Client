"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  categoryTag: string;
  headlineMain: string;
  headlineAccent: string;
  description: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "Photo Studios & Cyclorama Lofts",
    headlineMain: "Natural light spaces for",
    headlineAccent: "photo and video shoots.",
    description:
      "Find daylight-filled lofts, seamless infinity cycloramas, and fully equipped spaces ready for editorial fashion, product photography, and commercial campaigns.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "Film Stages & Motion Sets",
    headlineMain: "Soundstages built for",
    headlineAccent: "commercial and narrative film.",
    description:
      "Spacious sound-isolated stages with 3-phase power, pre-hung lighting grids, drive-in loading access, and green screen capabilities.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=85",
    categoryTag: "Audio Suites & Podcast Lounges",
    headlineMain: "Acoustically treated rooms for",
    headlineAccent: "podcasts and recording.",
    description:
      "Turnkey multi-camera podcast rooms and vocal tracking suites with broadcast microphones, acoustic treatment, and professional monitoring.",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white select-none">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
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
        className="w-full h-[580px] sm:h-[660px] lg:h-[720px]"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Photography */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.headlineMain}
                fill
                priority={idx === 0}
                className="object-cover object-center scale-105 animate-in zoom-in duration-1000"
                sizes="100vw"
              />
              {/* Natural Vignette & Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 container mx-auto h-full px-6 sm:px-12 flex flex-col justify-center">
              <div className="max-w-2xl">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-medium mb-5">
                  {slide.categoryTag}
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5">
                  <span>{slide.headlineMain}</span>{" "}
                  <span className="italic font-normal text-accent font-serif">
                    {slide.headlineAccent}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-white/85 leading-relaxed font-sans max-w-xl mb-8">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/studios">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-full px-7 py-3.5 text-xs uppercase tracking-wider font-semibold shadow-hover flex items-center gap-2 group"
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/add-studio">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-7 py-3.5 text-xs uppercase tracking-wider font-semibold text-white border-white/30 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-md transition-all flex items-center gap-2"
                    >
                      <Compass className="w-4 h-4 text-accent" />
                      <span>List Your Space</span>
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
