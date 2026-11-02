import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 max-w-6xl space-y-8 animate-pulse">
      <div className="space-y-3">
        <Skeleton className="h-5 w-32 rounded-full" />
        <Skeleton className="h-10 w-96 rounded-xl" />
        <Skeleton className="h-4 w-2/3 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-border p-4 space-y-4">
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
    </div>
  );
}
