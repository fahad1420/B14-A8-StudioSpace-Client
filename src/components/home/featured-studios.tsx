"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Studio } from "@/types";
import { studioApi, miscApi } from "@/lib/api";
import { StudioCard } from "@/components/studios/studio-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function FeaturedStudios() {
  const { isAuthenticated } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setIsLoading(true);
        const res = await studioApi.getAll({ limit: 6, sort: "rating" });
        if (res && res.data) {
          setStudios(res.data);
        }
      } catch (err: any) {
        setError("Could not load featured production workspaces from database.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatured();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      miscApi
        .getWishlist()
        .then((res) => {
          if (res && res.savedIds) setWishlistIds(res.savedIds);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDPICKED ARCHITECTURAL WORKSPACES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Featured Production Studios
            </h2>
          </div>

          <Link href="/studios" className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2.5 gap-2 text-xs font-mono uppercase tracking-wider font-semibold border-border hover:border-accent"
            >
              <span>Explore All Spaces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="rounded-2xl border border-border p-5 space-y-4 bg-card">
                <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-7 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Skeleton className="h-7 w-24" />
                  <Skeleton className="h-9 w-28 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-14 border border-border rounded-2xl bg-surface-secondary/40 p-8 max-w-lg mx-auto">
            <p className="text-muted-foreground mb-4 text-sm">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              Retry Connection
            </Button>
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl bg-surface-secondary/30 p-8 max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-semibold mb-2">No Featured Studios Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Our hosts are currently onboarding daylight cycloramas and cinema soundstages. Be the first to list your creative stage!
            </p>
            <Link href="/add-studio">
              <Button variant="accent">List Your Studio Space</Button>
            </Link>
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
    </section>
  );
}
