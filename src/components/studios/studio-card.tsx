"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Studio } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Users } from "lucide-react";
import { miscApi } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

interface StudioCardProps {
  studio: Studio;
  isWishlisted?: boolean;
  onWishlistToggle?: (studioId: string, newState: boolean) => void;
}

export function StudioCard({ studio, isWishlisted = false, onWishlistToggle }: StudioCardProps) {
  const { isAuthenticated } = useAuth();
  const [saved, setSaved] = useState(isWishlisted);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info("Please log in to save studios to your wishlist.");
      return;
    }

    setLoadingWishlist(true);
    try {
      const res = await miscApi.toggleWishlist(studio._id);
      setSaved(res.saved);
      if (onWishlistToggle) {
        onWishlistToggle(studio._id, res.saved);
      }
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.message || "Failed to update wishlist");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-subtle hover:shadow-hover hover:border-accent/40 transition-all duration-300 flex flex-col h-full">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-secondary">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="backdrop-blur-md bg-background/85 font-medium shadow-sm">
            {studio.category}
          </Badge>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          disabled={loadingWishlist}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 ${
            saved
              ? "bg-rose-500 text-white shadow-sm"
              : "bg-black/30 text-white hover:bg-black/50 hover:scale-110"
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
        </button>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-md border border-border text-xs font-semibold text-foreground shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{studio.rating ? Number(studio.rating).toFixed(1) : "5.0"}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
            {studio.title}
          </h3>

          {/* Capacity Spec */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Up to {studio.maxCapacity} people</span>
            </span>
          </div>
        </div>

        {/* Bottom Price & View Details CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-foreground">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-muted-foreground">/ hr</span>
            </div>
            {studio.securityDeposit > 0 && (
              <span className="text-[10px] text-muted-foreground block -mt-0.5">
                +${studio.securityDeposit} deposit
              </span>
            )}
          </div>

          <Link href={`/studios/${studio._id}`}>
            <Button variant="default" size="sm" className="rounded-lg font-medium text-xs">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
