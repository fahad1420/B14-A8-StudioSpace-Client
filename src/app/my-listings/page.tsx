"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useAuth } from "@/context/auth-context";
import { studioApi } from "@/lib/api";
import { Studio } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Building2,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  DollarSign,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete modal state
  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyStudios = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await studioApi.getAll({ hostId: user.id });
      if (res && res.data) {
        setStudios(res.data);
      }
    } catch {
      toast.error("Failed to load your studio listings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStudios();
  }, [user]);

  const confirmDelete = async () => {
    if (!studioToDelete) return;
    setIsDeleting(true);
    try {
      await studioApi.delete(studioToDelete._id);
      toast.success(`"${studioToDelete.title}" listing deleted successfully.`);
      setStudios((prev) => prev.filter((s) => s._id !== studioToDelete._id));
      setStudioToDelete(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete studio listing.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-24">
        {/* Header Banner */}
        <section className="bg-surface-secondary/70 border-b border-border py-14">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Studio Management</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  My Studio Listings
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Manage your studio listings, update details and rates, or add new spaces.
                </p>
              </div>

              <Link href="/add-studio">
                <Button variant="accent" className="gap-2 shadow-hover font-mono font-semibold uppercase tracking-wider text-xs">
                  <PlusCircle className="w-4 h-4" />
                  <span>List New Studio</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border p-5 flex gap-5 items-center bg-card">
                  <Skeleton className="w-32 h-24 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : studios.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-border bg-surface-secondary/30 p-8 max-w-lg mx-auto">
              <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                No Active Studio Listings
              </h3>
              <p className="text-sm text-muted-foreground mb-6 font-sans">
                You have not listed any studios yet. Start earning by sharing your creative workspace with photographers, filmmakers, and creators.
              </p>
              <Link href="/add-studio">
                <Button variant="accent" className="font-mono text-xs uppercase tracking-wider">
                  List Your First Space
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {studios.map((studio) => (
                <div
                  key={studio._id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >
                  {/* Thumbnail & Core Info */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden bg-black shrink-0 border border-border">
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="accent" className="text-[10px] font-mono uppercase font-semibold">
                          {studio.category}
                        </Badge>
                        <Badge variant="success" className="text-[10px] font-mono uppercase">
                          Active
                        </Badge>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1">
                        {studio.title}
                      </h3>

                      <p className="text-xs text-muted-foreground flex items-center gap-1 truncate max-w-xs sm:max-w-md font-sans">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{studio.location}</span>
                      </p>

                      <div className="flex items-baseline gap-1 text-xs pt-0.5 font-mono">
                        <span className="font-serif text-lg font-bold text-foreground">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-muted-foreground">/ hr</span>
                        {studio.securityDeposit > 0 && (
                          <span className="text-muted-foreground ml-2">
                            (+${studio.securityDeposit} deposit)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">
                    <Link href={`/studios/${studio._id}`} target="_blank">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-mono">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </Button>
                    </Link>

                    <Link href={`/studios/edit/${studio._id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs font-mono">
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setStudioToDelete(studio)}
                      className="gap-1.5 text-xs font-mono"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {studioToDelete && (
          <Modal
            isOpen={!!studioToDelete}
            onClose={() => setStudioToDelete(null)}
            title="Confirm Studio Deletion"
            maxWidth="md"
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 font-mono">
                  <p className="font-semibold text-sm">Warning: This action is permanent.</p>
                  <p>
                    Deleting &quot;{studioToDelete.title}&quot; will permanently remove this listing from the directory and cancel any unscheduled requests.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setStudioToDelete(null)}
                  disabled={isDeleting}
                  className="font-mono text-xs uppercase"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  isLoading={isDeleting}
                  className="font-mono text-xs uppercase"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}
