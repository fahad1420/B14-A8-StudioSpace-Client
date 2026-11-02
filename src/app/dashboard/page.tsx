"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useAuth } from "@/context/auth-context";
import { bookingApi, studioApi, miscApi } from "@/lib/api";
import { Booking, Studio } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Building,
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  PlusCircle,
  Heart,
  Calendar,
  AlertCircle,
  Shield,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"host" | "creator">("creator");
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [hostBookings, setHostBookings] = useState<Booking[]>([]);
  const [myStudios, setMyStudios] = useState<Studio[]>([]);
  const [savedStudios, setSavedStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadDashboardData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [myBRes, hostBRes, studiosRes, wishlistRes] = await Promise.allSettled([
        bookingApi.getMy(),
        bookingApi.getHost(),
        studioApi.getAll({ hostId: user.id }),
        miscApi.getWishlist(),
      ]);

      if (myBRes.status === "fulfilled" && myBRes.value?.data) {
        setMyBookings(myBRes.value.data);
      }
      if (hostBRes.status === "fulfilled" && hostBRes.value?.data) {
        setHostBookings(hostBRes.value.data);
        // If user has incoming host requests, default or suggest host view
        if (hostBRes.value.data.length > 0) {
          setActiveTab("host");
        }
      }
      if (studiosRes.status === "fulfilled" && studiosRes.value?.data) {
        setMyStudios(studiosRes.value.data);
      }
      if (wishlistRes.status === "fulfilled" && wishlistRes.value?.data) {
        setSavedStudios(wishlistRes.value.data);
      }
    } catch {
      toast.error("Failed to load dashboard overview.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  // Host Action: Update incoming booking request status
  const handleUpdateStatus = async (
    bookingId: string,
    newStatus: "Confirmed" | "Cancelled" | "Completed"
  ) => {
    setProcessingId(bookingId);
    try {
      const res = await bookingApi.updateStatus(bookingId, newStatus);
      toast.success(res.message || `Booking marked as ${newStatus}`);
      setHostBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to update booking status");
    } finally {
      setProcessingId(null);
    }
  };

  // Real data metrics (NO fake statistics)
  const pendingHostRequests = hostBookings.filter((b) => b.status === "Pending");
  const confirmedHostShoots = hostBookings.filter((b) => b.status === "Confirmed");
  const completedHostShoots = hostBookings.filter((b) => b.status === "Completed");

  const pendingCreatorReservations = myBookings.filter((b) => b.status === "Pending");
  const confirmedCreatorReservations = myBookings.filter((b) => b.status === "Confirmed");

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-24">
        {/* Header Banner */}
        <section className="bg-surface-secondary/70 border-b border-border py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  Creative Workspace Operations
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">
                  Workspace Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome back, <strong className="text-foreground">{user?.name}</strong>. Monitor incoming shoots and reserved spaces.
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-card shadow-subtle w-fit">
                <button
                  onClick={() => setActiveTab("creator")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "creator"
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Creator View ({myBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab("host")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "host"
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Host Operations ({myStudios.length} Spaces)
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8 max-w-6xl">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-28 rounded-2xl" />
                <Skeleton className="h-28 rounded-2xl" />
                <Skeleton className="h-28 rounded-2xl" />
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          ) : activeTab === "creator" ? (
            /* ================= CREATOR TAB ================= */
            <div className="space-y-8">
              {/* Creator Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block uppercase font-medium">
                      Active Reservations
                    </span>
                    <span className="font-serif text-3xl font-bold text-foreground">
                      {confirmedCreatorReservations.length}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block uppercase font-medium">
                      Pending Requests
                    </span>
                    <span className="font-serif text-3xl font-bold text-amber-500">
                      {pendingCreatorReservations.length}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block uppercase font-medium">
                      Saved Studios
                    </span>
                    <span className="font-serif text-3xl font-bold text-foreground">
                      {savedStudios.length}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-500">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Creator Upcoming Bookings */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    My Upcoming Shoot Sessions
                  </h3>
                  <Link href="/my-bookings">
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <span>View Full History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                {myBookings.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-muted-foreground mb-3">
                      No active workspace reservations found.
                    </p>
                    <Link href="/studios">
                      <Button variant="accent" size="sm">
                        Discover Studios
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myBookings.slice(0, 4).map((b) => (
                      <div
                        key={b._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-surface-secondary/40 gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                            <Image
                              src={b.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"}
                              alt={b.studioTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-sm text-foreground line-clamp-1">
                              {b.studioTitle}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {b.bookingDate} ({b.startTime} - {b.endTime})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <span className="font-serif font-bold text-sm text-accent">
                            ${b.totalAmount.toFixed(2)}
                          </span>
                          <Badge
                            variant={
                              b.status === "Confirmed"
                                ? "success"
                                : b.status === "Pending"
                                ? "warning"
                                : "outline"
                            }
                          >
                            {b.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Studios Carousel/Grid */}
              {savedStudios.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-subtle">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Saved Workspaces ({savedStudios.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {savedStudios.map((s) => (
                      <Link
                        key={s._id}
                        href={`/studios/${s._id}`}
                        className="group block p-3 rounded-xl border border-border bg-surface-secondary/40 hover:border-accent/40 transition-all"
                      >
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-2 bg-black">
                          <Image
                            src={s.imageUrl}
                            alt={s.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="font-serif font-bold text-xs text-foreground truncate">
                          {s.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                          <span>{s.category}</span>
                          <span className="font-semibold text-accent">${s.hourlyRate}/hr</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ================= HOST TAB ================= */
            <div className="space-y-8">
              {/* Host Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
                  <span className="text-xs text-muted-foreground block uppercase font-medium">
                    Published Stages
                  </span>
                  <span className="font-serif text-3xl font-bold text-foreground">
                    {myStudios.length}
                  </span>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
                  <span className="text-xs text-muted-foreground block uppercase font-medium">
                    Pending Inquiries
                  </span>
                  <span className="font-serif text-3xl font-bold text-amber-500">
                    {pendingHostRequests.length}
                  </span>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
                  <span className="text-xs text-muted-foreground block uppercase font-medium">
                    Confirmed Shoots
                  </span>
                  <span className="font-serif text-3xl font-bold text-emerald-600">
                    {confirmedHostShoots.length}
                  </span>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
                  <span className="text-xs text-muted-foreground block uppercase font-medium">
                    Completed Wraps
                  </span>
                  <span className="font-serif text-3xl font-bold text-foreground">
                    {completedHostShoots.length}
                  </span>
                </div>
              </div>

              {/* Incoming Booking Requests (Section 17 Workflow) */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Incoming Booking Requests
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Confirm pending slots, complete finished shoots, or reject schedule conflicts
                    </p>
                  </div>
                  <Link href="/add-studio">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <PlusCircle className="w-3.5 h-3.5 text-accent" />
                      <span>Add Space</span>
                    </Button>
                  </Link>
                </div>

                {hostBookings.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-muted-foreground mb-3">
                      No incoming booking requests yet. Once creators discover your spaces, reservations will populate here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hostBookings.map((b) => (
                      <div
                        key={b._id}
                        className="rounded-xl border border-border bg-surface-secondary/30 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                b.status === "Confirmed"
                                  ? "success"
                                  : b.status === "Pending"
                                  ? "warning"
                                  : b.status === "Completed"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {b.status}
                            </Badge>
                            <span className="text-xs font-semibold text-foreground">
                              Creator: {b.creatorName} ({b.creatorEmail})
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-base text-foreground">
                            {b.studioTitle}
                          </h4>

                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            <span>
                              {b.bookingDate} | {b.startTime} - {b.endTime} ({b.duration} hrs)
                            </span>
                          </p>

                          {b.notes && (
                            <p className="text-xs text-muted-foreground bg-card p-2 rounded-lg border border-border/60 max-w-lg mt-1 italic">
                              &quot;{b.notes}&quot;
                            </p>
                          )}
                        </div>

                        {/* Financial Snapshot & Host Status Transitions */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">
                          <div className="text-left sm:text-right">
                            <span className="text-xs text-muted-foreground block">Payout Total:</span>
                            <span className="font-serif text-lg font-bold text-accent">
                              ${b.totalAmount.toFixed(2)}
                            </span>
                          </div>

                          {/* Host Action Buttons */}
                          <div className="flex items-center gap-2">
                            {b.status === "Pending" && (
                              <>
                                <Button
                                  variant="accent"
                                  size="sm"
                                  disabled={processingId === b._id}
                                  onClick={() => handleUpdateStatus(b._id, "Confirmed")}
                                  className="text-xs gap-1"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Confirm</span>
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={processingId === b._id}
                                  onClick={() => handleUpdateStatus(b._id, "Cancelled")}
                                  className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Decline</span>
                                </Button>
                              </>
                            )}

                            {b.status === "Confirmed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={processingId === b._id}
                                onClick={() => handleUpdateStatus(b._id, "Completed")}
                                className="text-xs gap-1 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Mark Completed</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Host's Listed Studios */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    My Studio Listings ({myStudios.length})
                  </h3>
                  <Link href="/my-listings">
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <span>Manage All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {myStudios.map((s) => (
                    <div
                      key={s._id}
                      className="p-3.5 rounded-xl border border-border bg-surface-secondary/40 space-y-2"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black">
                        <Image src={s.imageUrl} alt={s.title} fill className="object-cover" />
                      </div>
                      <h4 className="font-serif font-bold text-sm text-foreground truncate">
                        {s.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{s.category}</span>
                        <span className="font-semibold text-foreground">${s.hourlyRate}/hr</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
