"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Studio } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Users, ArrowRight } from "lucide-react";
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
    <div className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-subtle hover:shadow-card hover:border-accent/60 transition-all duration-300 flex flex-col h-full">
      {/* Top Photography Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-secondary">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <div className="px-3 py-1 rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-white text-xs font-medium shadow-sm">
            {studio.category}
          </div>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          disabled={loadingWishlist}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 ${
            saved
              ? "bg-rose-500 text-white shadow-sm"
              : "bg-black/40 text-white hover:bg-black/60 hover:scale-110"
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
        </button>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{studio.rating ? Number(studio.rating).toFixed(1) : "5.0"}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Capacity Strip */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1.5 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">{studio.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs shrink-0">
              <Users className="w-3.5 h-3.5 text-muted-foreground/80" />
              <span>Up to {studio.maxCapacity} people</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/studios/${studio._id}`} className="block group-hover:text-accent transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground line-clamp-1 mb-2 tracking-tight">
              {studio.title}
            </h3>
          </Link>

          {/* Amenities Preview */}
          {studio.amenities && studio.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {studio.amenities.slice(0, 2).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-surface-secondary text-[11px] text-muted-foreground truncate max-w-[170px]"
                >
                  {amenity}
                </span>
              ))}
              {studio.amenities.length > 2 && (
                <span className="px-1.5 py-0.5 rounded bg-surface-secondary text-[11px] text-muted-foreground">
                  +{studio.amenities.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Price & View Details CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-muted-foreground">/ hour</span>
            </div>
            {studio.securityDeposit > 0 ? (
              <span className="text-[11px] text-muted-foreground block -mt-0.5">
                +${studio.securityDeposit} deposit
              </span>
            ) : (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block -mt-0.5">
                No security deposit
              </span>
            )}
          </div>

          <Link href={`/studios/${studio._id}`}>
            <Button
              variant="default"
              size="sm"
              className="rounded-lg text-xs font-semibold gap-1.5 group-hover:bg-accent group-hover:text-accent-foreground transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
