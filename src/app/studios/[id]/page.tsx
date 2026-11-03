"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Studio } from "@/types";
import { studioApi, miscApi } from "@/lib/api";
import { BookingModal } from "@/components/booking/booking-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import {
  MapPin,
  Users,
  CheckCircle,
  Star,
  Heart,
  ShieldCheck,
  Calendar,
  Share2,
  ChevronLeft,
  Mail,
  User as UserIcon,
  Sparkles,
  Zap,
} from "lucide-react";

export default function StudioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const { isAuthenticated, user } = useAuth();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudio() {
      try {
        setIsLoading(true);
        const res = await studioApi.getById(studioId);
        if (res && res.data) {
          setStudio(res.data);
          setActiveImage(res.data.imageUrl);
        } else {
          setError("Studio profile not found in database.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load studio details.");
      } finally {
        setIsLoading(false);
      }
    }

    if (studioId) loadStudio();
  }, [studioId]);

  // Check wishlist state
  useEffect(() => {
    if (isAuthenticated && studioId) {
      miscApi
        .getWishlist()
        .then((res) => {
          if (res?.savedIds?.includes(studioId)) {
            setIsWishlisted(true);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, studioId]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to save workspaces.");
      return;
    }
    try {
      const res = await miscApi.toggleWishlist(studioId);
      setIsWishlisted(res.saved);
      toast.success(res.message);
    } catch {
      toast.error("Could not update saved studios.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: studio?.title || "StudioSpace Studio",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Studio link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl space-y-8">
        <Skeleton className="h-8 w-44 rounded-lg" />
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <h2 className="font-serif text-3xl font-bold mb-3">Studio Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {error || "The requested studio listing could not be found or has been removed."}
        </p>
        <Link href="/studios">
          <Button variant="accent">Return to Explore Studios</Button>
        </Link>
      </div>
    );
  }

  const allImages = [studio.imageUrl, ...(studio.gallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Back button breadcrumb bar */}
      <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs text-muted-foreground border-b border-border/70">
        <Link
          href="/studios"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Studios</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWishlistToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs transition-colors ${
              isWishlisted
                ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
                : "hover:bg-surface-secondary text-foreground"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>{isWishlisted ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs hover:bg-surface-secondary text-foreground transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mt-6 max-w-6xl">
        {/* Title Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <Badge variant="accent" className="text-[11px] font-mono uppercase tracking-wider font-semibold">
              {studio.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground bg-surface-secondary px-2.5 py-1 rounded-full border border-border">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{studio.rating ? Number(studio.rating).toFixed(1) : "5.0"}</span>
              <span className="text-muted-foreground font-normal">
                ({studio.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            {studio.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span className="font-sans">{studio.location}</span>
          </div>
        </div>

        {/* Gallery Visual Showcase with Viewfinder Corners */}
        <div className="space-y-3 mb-12">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-black shadow-card">
            <Image
              src={activeImage || studio.imageUrl}
              alt={studio.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Thumbnails row if more than 1 image */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img
                      ? "border-accent ring-2 ring-accent/30 scale-105"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content & Sticky Booking Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Details & Amenities (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Pill Bar */}
            <div className="flex flex-wrap items-center gap-6 p-5 rounded-2xl border border-border bg-surface-secondary/50 text-sm font-mono text-xs">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>
                  Max Capacity: <strong className="text-foreground">{studio.maxCapacity} people</strong>
                </span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>
                  Deposit: <strong className="text-foreground">${studio.securityDeposit}</strong>
                </span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-foreground font-semibold">Host Approval Required</span>
              </div>
            </div>

            {/* Detailed Overview */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About this space</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Space Overview &amp; Guidelines
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line font-sans">
                {studio.overview}
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>Features &amp; Gear</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Amenities &amp; Included Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {studio.amenities &&
                  studio.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card shadow-subtle text-xs sm:text-sm text-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Host Information Card */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Hosted by {studio.hostName}
              </h2>
              <div className="rounded-2xl border border-border bg-surface-secondary/50 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-card shrink-0">
                  {studio.hostImage ? (
                    <Image
                      src={studio.hostImage}
                      alt={studio.hostName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent/15 text-accent">
                      <UserIcon className="w-7 h-7" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {studio.hostName || "Studio Host"}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] w-fit mx-auto sm:mx-0">
                      Host
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 mb-3 font-mono">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>{studio.hostEmail}</span>
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Committed to responsive communication and smooth check-ins. Reach out with any questions about gear, setup, or access.
                  </p>
                </div>
              </div>
            </div>

            {/* Honest Reviews Section */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Guest Reviews
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Reviews are submitted by creators who have completed booked sessions.
              </p>

              {studio.reviewCount && studio.reviewCount > 0 ? (
                <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Rated {Number(studio.rating).toFixed(1)} out of 5.0</span>
                    <span className="text-muted-foreground font-normal">
                      ({studio.reviewCount} {studio.reviewCount === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Verified guest rating based on completed bookings.
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 rounded-2xl border border-border bg-surface-secondary/30 p-6">
                  <Star className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <h4 className="font-serif text-base font-semibold text-foreground mb-1">
                    No Written Reviews Yet
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto font-sans">
                    Be the first creator to book this workspace and leave your review upon completion.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Booking Action Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
              {/* Hourly Pricing Header */}
              <div className="flex items-baseline justify-between border-b border-border/70 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase tracking-wider">
                    Rental Rate
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-serif text-3xl font-extrabold text-foreground">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">/ hour</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase tracking-wider">
                    Deposit
                  </span>
                  <span className="text-sm font-mono font-semibold text-foreground">
                    ${studio.securityDeposit}
                  </span>
                </div>
              </div>

              {/* Booking Highlights */}
              <div className="space-y-3 text-xs text-muted-foreground font-mono">
                <div className="flex items-center justify-between">
                  <span>Minimum Session:</span>
                  <span className="font-semibold text-foreground">1 hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Capacity:</span>
                  <span className="font-semibold text-foreground">{studio.maxCapacity} people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cancellation Policy:</span>
                  <span className="font-semibold text-foreground">Free while Pending</span>
                </div>
              </div>

              {/* Main Booking CTA */}
              <Button
                variant="accent"
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="w-full rounded-xl py-4 text-xs font-semibold tracking-wider uppercase shadow-hover"
              >
                Request Reservation
              </Button>

              <p className="text-[11px] text-center text-muted-foreground leading-tight font-sans">
                No immediate payment required. Submitting creates a Pending reservation awaiting host approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          studio={studio}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
