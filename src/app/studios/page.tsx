"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Studio } from "@/types";
import { studioApi, miscApi } from "@/lib/api";
import { StudioCard } from "@/components/studios/studio-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  DollarSign,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Photo Studio",
  "Sound Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Highest Rated", value: "rating" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

function StudiosListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  // Search and filter states initialized from URL search params
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [locationTerm, setLocationTerm] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  const [studios, setStudios] = useState<Studio[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      if (cat === "Podcast Rooms") setSelectedCategory("Podcast Lounge");
      else if (cat === "Art Workshops") setSelectedCategory("Workshop");
      else setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Load wishlist for logged-in user
  useEffect(() => {
    if (isAuthenticated) {
      miscApi
        .getWishlist()
        .then((res) => {
          if (res?.savedIds) setWishlistIds(res.savedIds);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  // Fetch studios based on current filters
  const fetchStudios = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (selectedCategory && selectedCategory !== "All") params.category = selectedCategory;
      if (locationTerm.trim()) params.location = locationTerm.trim();
      if (minPrice) params.minPrice = Number(minPrice);
      if (maxPrice) params.maxPrice = Number(maxPrice);
      if (sortBy) params.sort = sortBy;

      const res = await studioApi.getAll(params);
      if (res && res.data) {
        setStudios(res.data);
      }
    } catch (error) {
      console.error("Failed to load studios:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, locationTerm, minPrice, maxPrice, sortBy]);

  // Debounced search / trigger on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudios();

      const query = new URLSearchParams();
      if (searchTerm.trim()) query.set("search", searchTerm.trim());
      if (selectedCategory && selectedCategory !== "All") query.set("category", selectedCategory);
      if (locationTerm.trim()) query.set("location", locationTerm.trim());
      if (minPrice) query.set("minPrice", minPrice);
      if (maxPrice) query.set("maxPrice", maxPrice);
      if (sortBy && sortBy !== "newest") query.set("sort", sortBy);

      const qStr = query.toString();
      router.replace(`/studios${qStr ? `?${qStr}` : ""}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchStudios, router, searchTerm, selectedCategory, locationTerm, minPrice, maxPrice, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setLocationTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    router.replace("/studios", { scroll: false });
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "All" ||
    locationTerm !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortBy !== "newest";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Banner */}
      <section className="bg-surface-secondary/70 border-b border-border py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent block mb-2">
              Studio Directory
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Explore Creative Studios
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Find daylight lofts, film stages, soundproof podcast rooms, and creative workshops available to rent by the hour.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <div className="container mx-auto px-4 sm:px-6 mt-8">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-subtle mb-8">
          {/* Top Row: Search Input + Location + Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search by title / keyword */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by studio name or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-surface text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            {/* Location filter */}
            <div className="md:col-span-4 relative">
              <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-accent" />
              <input
                type="text"
                placeholder="City or neighborhood..."
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-surface text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            {/* Sort selector */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort studios catalog"
                className="w-full h-10 px-3.5 rounded-xl border border-input bg-surface text-sm text-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent cursor-pointer transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pills + Price Filter */}
          <div className="mt-5 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                        : "bg-surface-secondary text-muted-foreground hover:text-foreground hover:bg-surface-tertiary"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Price Range inputs & Clear action */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <DollarSign className="w-3.5 h-3.5" />
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-16 h-8 px-2 text-xs rounded-lg border border-input bg-surface text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-16 h-8 px-2 text-xs rounded-lg border border-input bg-surface text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <span className="text-xs">/hr</span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium ml-2 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-semibold text-foreground">{studios.length}</span>{" "}
            {studios.length === 1 ? "studio" : "studios"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Studios Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-border p-5 space-y-4 bg-card">
                <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex justify-between pt-4 border-t border-border">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 border border-border rounded-2xl bg-surface-secondary/30 p-8 max-w-xl mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              No Studios Found
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              No spaces match your selected filters. Try broadening your search or clearing price limits.
            </p>
            <Button onClick={handleClearFilters} variant="accent" className="text-xs uppercase tracking-wider font-semibold">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studios.map((studio) => (
              <StudioCard
                key={studio._id}
                studio={studio}
                isWishlisted={wishlistIds.includes(studio._id)}
                onWishlistToggle={(id, saved) => {
                  setWishlistIds((prev) =>
                    saved ? [...prev, id] : prev.filter((item) => item !== id)
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 container mx-auto px-6">
          <Skeleton className="h-12 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
          </div>
        </div>
      }
    >
      <StudiosListContent />
    </Suspense>
  );
}
