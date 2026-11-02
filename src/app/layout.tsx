import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "SHOOT LOCATION | Find Your Space. Create Your Story.",
    template: "%s | SHOOT LOCATION",
  },
  description:
    "Peer-to-peer creative studio and production space rental marketplace. Discover and rent professional photo studios, film soundstages, podcast lounges, and recording suites.",
  keywords: [
    "creative studio rental",
    "photo studio hourly rental",
    "soundstage film production",
    "podcast studio",
    "music recording studio",
    "production space",
  ],
  authors: [{ name: "Shoot Location Creative Team" }],
  openGraph: {
    title: "SHOOT LOCATION | Find Your Space. Create Your Story.",
    description:
      "Peer-to-peer creative studio & production space rental marketplace for photographers, filmmakers, and creators.",
    type: "website",
    siteName: "Shoot Location",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Shoot Location Studios",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                className: "border border-border bg-card text-card-foreground shadow-modal font-sans",
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
