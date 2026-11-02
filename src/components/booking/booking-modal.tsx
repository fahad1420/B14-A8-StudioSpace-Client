"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Studio } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { bookingApi } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { Calendar, Clock, AlertCircle, CheckCircle2, FileText, Sparkles } from "lucide-react";

interface BookingModalProps {
  studio: Studio;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ studio, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Get tomorrow's date as default YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [bookingDate, setBookingDate] = useState<string>(defaultDateStr);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("13:00");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Time calculations
  const calculateDuration = () => {
    try {
      const [sH, sM] = startTime.split(":").map(Number);
      const [eH, eM] = endTime.split(":").map(Number);
      const sMin = sH * 60 + sM;
      const eMin = eH * 60 + eM;
      if (eMin <= sMin) return 0;
      return Math.round(((eMin - sMin) / 60) * 100) / 100;
    } catch {
      return 0;
    }
  };

  const duration = calculateDuration();
  const rentalAmount = Math.round(duration * studio.hourlyRate * 100) / 100;
  const securityDeposit = studio.securityDeposit || 0;
  const totalAmount = Math.round((rentalAmount + securityDeposit) * 100) / 100;

  const isOwnStudio = user && user.id === studio.hostId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isAuthenticated) {
      toast.error("Please log in to book this studio.");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }

    if (isOwnStudio) {
      setErrorMessage("You are registered as the host of this workspace. Hosts cannot rent their own listings.");
      return;
    }

    if (duration <= 0) {
      setErrorMessage("Wrap time must be later than load-in start time.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(`${bookingDate}T00:00:00`);
    if (selectedDate < today) {
      setErrorMessage("Production call date cannot be in the past.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookingApi.create({
        studioId: studio._id,
        bookingDate,
        startTime,
        endTime,
        notes: notes.trim() || undefined,
      });

      toast.success(res.message || "Production call sheet submitted with Pending status!");
      onClose();
      router.push("/my-bookings");
    } catch (err: any) {
      const msg = err.data?.message || err.message || "Failed to submit booking request.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Production Call Sheet Reservation"
      description={`Hourly production session at ${studio.title}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs leading-relaxed font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isOwnStudio && (
          <div className="flex items-start gap-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>You are the registered host of this workspace. Hosts cannot rent their own listings.</span>
          </div>
        )}

        {/* 1. Date Selection */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-2">
            1. Production Call Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-surface text-sm font-mono text-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent cursor-pointer"
            />
          </div>
        </div>

        {/* 2. Start & End Time Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-2">
              2. Load-In Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl border border-input bg-surface text-sm font-mono text-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-2">
              3. Wrap Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl border border-input bg-surface text-sm font-mono text-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Optional Notes for Host */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
            Special Production Notes &amp; Gear Needs (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Specify crew size, lighting packages, electrical draw, or sound isolation needs..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-xl border border-input bg-surface text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* 3. Real-Time Price Calculation Breakdown */}
        <div className="rounded-xl border border-border bg-surface-secondary/70 p-4 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Session Interval:</span>
            <span className="font-semibold text-foreground">
              {duration > 0 ? `${duration} hour${duration === 1 ? "" : "s"}` : "Invalid interval"}
            </span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span>
              Stage Rental (${studio.hourlyRate} × {duration} hrs):
            </span>
            <span className="font-semibold text-foreground">${rentalAmount.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span>Refundable Facility Deposit:</span>
            <span className="font-semibold text-foreground">${securityDeposit.toFixed(2)}</span>
          </div>

          <div className="h-px bg-border my-2" />

          <div className="flex items-center justify-between font-serif text-lg font-bold text-foreground">
            <span>Total Payable:</span>
            <span className="text-accent">${totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-sans leading-tight pt-1">
            * Security deposit is released following load-out inspection. The booking is submitted with Pending status awaiting host confirmation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="font-mono text-xs uppercase">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="accent"
            isLoading={isSubmitting}
            disabled={isSubmitting || duration <= 0 || !!isOwnStudio}
            className="gap-2 font-mono text-xs uppercase tracking-wider font-semibold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Call Sheet</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
