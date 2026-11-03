"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { bookingApi } from "@/lib/api";
import { Booking, BookingStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { generateBookingInvoice } from "@/lib/invoice";
import { toast } from "sonner";
import {
  CalendarCheck,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Download,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cancellation modal state
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await bookingApi.getMy();
      if (res && res.data) {
        setBookings(res.data);
      }
    } catch {
      toast.error("Failed to load your bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmCancel = async () => {
    if (!bookingToCancel) return;
    setIsCancelling(true);
    try {
      const res = await bookingApi.cancel(bookingToCancel._id);
      toast.success(res.message || "Booking cancelled successfully.");
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingToCancel._id ? { ...b, status: "Cancelled" } : b))
      );
      setBookingToCancel(null);
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to cancel booking.");
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Confirmed":
        return <Badge variant="success">Confirmed</Badge>;
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <section className="bg-surface-secondary/70 border-b border-border py-14">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reservations</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your studio reservations, check booking statuses, and download official PDF invoices.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8 max-w-5xl">
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
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-border bg-surface-secondary/30 p-8 max-w-lg mx-auto">
              <CalendarCheck className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                No Bookings Yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6 font-sans">
                You haven&apos;t reserved any creative workspaces yet. Explore available creative spaces to reserve your next session.
              </p>
              <Link href="/studios">
                <Button variant="accent" className="gap-2 font-mono text-xs uppercase tracking-wider">
                  <span>Explore Studios</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >
                  {/* Studio image & specs */}
                  <div className="flex items-start sm:items-center gap-4 w-full md:w-auto">
                    <div className="relative w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden bg-black shrink-0 border border-border">
                      <Image
                        src={booking.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"}
                        alt={booking.studioTitle}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Host: {booking.hostName}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1">
                        {booking.studioTitle}
                      </h3>

                      <p className="text-xs text-muted-foreground flex items-center gap-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate max-w-xs">{booking.studioLocation}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1 font-mono">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{booking.bookingDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {booking.startTime} - {booking.endTime} ({booking.duration} hrs)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Breakdown & Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-border gap-3">
                    <div className="text-left md:text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-mono text-muted-foreground">TOTAL:</span>
                        <span className="font-serif text-xl font-bold text-accent">
                          ${booking.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground block -mt-0.5">
                        (${booking.rentalAmount} rental + ${booking.securityDeposit} deposit)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* PDF Invoice Download for Confirmed/Completed Bookings */}
                      {(booking.status === "Confirmed" || booking.status === "Completed") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateBookingInvoice(booking)}
                          className="gap-1.5 text-xs rounded-lg font-mono"
                          title="Download official PDF invoice"
                        >
                          <Download className="w-3.5 h-3.5 text-accent" />
                          <span>PDF Invoice</span>
                        </Button>
                      )}

                      {/* Cancel action for Pending bookings */}
                      {booking.status === "Pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setBookingToCancel(booking)}
                          className="gap-1.5 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 font-mono"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancellation Confirmation Modal */}
        {bookingToCancel && (
          <Modal
            isOpen={!!bookingToCancel}
            onClose={() => setBookingToCancel(null)}
            title="Cancel Booking Request"
            description="Are you sure you want to cancel this reservation request?"
            maxWidth="md"
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2.5 font-mono">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Canceling will release your reserved slot for {bookingToCancel.studioTitle} on{" "}
                  {bookingToCancel.bookingDate}. This action cannot be undone.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setBookingToCancel(null)}
                  disabled={isCancelling}
                  className="font-mono text-xs uppercase"
                >
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmCancel}
                  isLoading={isCancelling}
                  className="font-mono text-xs uppercase"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}
