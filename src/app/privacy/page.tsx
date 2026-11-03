import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | StudioSpace",
  description: "Learn how StudioSpace collects, uses, and protects your personal and booking information.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">1. Overview</h2>
            <p>
              StudioSpace respects your privacy and is committed to protecting the personal information you share with us. This policy describes how we collect, use, and safeguard your details when using our creative studio rental platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">2. Information We Collect</h2>
            <p>
              When you create an account, list a workspace, or request a studio booking, we collect basic profile information (such as your name, email address, and optional avatar) as well as reservation dates and booking notes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">3. How Information Is Used</h2>
            <p>
              Information is used strictly to facilitate account authentication, studio discovery, booking communications between hosts and creators, and customer support. We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">4. Data Security</h2>
            <p>
              Authentication sessions use secure HTTP-only cookies to keep session tokens protected from client-side script access. We apply industry-standard security practices to safeguard data in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-foreground mb-2">5. Contact</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please reach out to us at{" "}
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
