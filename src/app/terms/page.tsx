import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | StudioSpace",
  description: "Terms and conditions governing the use of the StudioSpace platform for hosts and creators.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using StudioSpace, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">2. Creative Studio Bookings</h2>
            <p>
              StudioSpace provides a marketplace connecting creators and studio hosts. Submitting a reservation creates a pending request. Reservations become confirmed only upon acceptance by the studio host. Double-booking conflicts are prevented at the time of scheduling.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">3. Host and Creator Responsibilities</h2>
            <p>
              Hosts are responsible for providing accurate studio specifications, equipment inventories, and maintaining safe working facilities. Creators agree to respect studio rules, load-in and wrap times, and handle equipment with care.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">4. Cancellations and Security Deposits</h2>
            <p>
              Pending bookings may be canceled by the creator prior to host confirmation without penalty. Security deposits, when applicable, are collected to safeguard host facilities and are released following wrap inspection.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">5. Inquiries</h2>
            <p>
              For legal questions or assistance, contact us at{" "}
              <a href="mailto:support@studiospace.com" className="text-accent underline">
                support@studiospace.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
