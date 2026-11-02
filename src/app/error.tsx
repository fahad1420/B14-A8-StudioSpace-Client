"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("StudioSpace client runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Something Went Wrong
          </h2>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            An unexpected error occurred while communicating with the studio marketplace.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="accent" onClick={() => reset()} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
