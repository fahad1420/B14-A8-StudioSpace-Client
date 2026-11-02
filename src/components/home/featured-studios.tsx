"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Studio } from "@/types";
import { studioApi, miscApi } from "@/lib/api";
import { StudioCard } from "@/components/studios/studio-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
        setError("Could not load featured workspaces.");
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Workspaces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Featured Production Studios
            </h2>
          </div>

          <Link href="/studios" className="mt-4 md:mt-0">
            <Button variant="outline" className="rounded-full gap-2 text-xs uppercase tracking-wider font-semibold">
              <span>View All 6+ Spaces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="rounded-2xl border border-border p-4 space-y-4">
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
        ) : error ? (
          <div className="text-center py-12 border border-border rounded-2xl bg-surface-secondary/40 p-8">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl bg-surface-secondary/30 p-8">
            <h3 className="font-serif text-2xl font-semibold mb-2">No Featured Studios Yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Our hosts are currently onboarding high-calibre production environments. Be the first to host your studio!
            </p>
            <Link href="/add-studio">
              <Button variant="accent">Host Your Space</Button>
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
