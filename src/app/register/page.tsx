"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, User, Image as ImageIcon, ArrowRight, Check, X } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Requirement: Real-time password verification rules
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!isPasswordValid) {
      setGeneralError("Password must meet all security requirements listed below.");
      toast.error("Please provide a password meeting the criteria.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        photoUrl: photoUrl.trim() || undefined,
      });
      if (res.success) {
        toast.success("Account created successfully! Please log in with your credentials.");
        router.push("/login");
      } else {
        setGeneralError(res.message || "Failed to register account.");
        toast.error(res.message || "Registration failed.");
      }
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred during account creation.";
      setGeneralError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      toast.info("Connecting to Google OAuth authentication...");

      const callbackURL = `${window.location.origin}/dashboard`;
      // In browser, initiate social sign-in via Vercel domain rewrite (/api/auth/sign-in/social) so that
      // OAuth state cookies are first-party and Google redirect_uri is strictly https://thestudiospace.vercel.app/api/auth/callback/google
      let response: Response;
      try {
        response = await fetch("/api/auth/sign-in/social", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: "google",
            callbackURL,
          }),
          credentials: "include",
        });
        if (!response.ok && API_BASE_URL && API_BASE_URL !== window.location.origin) {
          response = await fetch(`${API_BASE_URL}/api/auth/sign-in/social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              callbackURL,
            }),
            credentials: "include",
          });
        }
      } catch {
        response = await fetch(`${API_BASE_URL}/api/auth/sign-in/social`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: "google",
            callbackURL,
          }),
          credentials: "include",
        });
      }

      const data = await response.json().catch(() => null);

      if (data && data.url) {
        window.location.href = data.url;
        return;
      }

      toast.error(
        data?.message || "Google OAuth credentials are not configured on the server."
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to initialize Google OAuth registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-surface-secondary/30 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" />
          <p className="text-[10px] uppercase font-mono tracking-[0.28em] text-muted-foreground mt-3">
            Find Your Space. Create Your Story.
          </p>
        </div>

        <Card className="border-border shadow-modal rounded-2xl bg-card relative overflow-hidden">
          <CardHeader className="text-center pb-4 pt-6">
            <CardTitle className="font-serif text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription className="text-xs">
              Join the creative community to discover, book, or host studio spaces
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {generalError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono">
                  {generalError}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 text-xs font-sans"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                  <Input
                    type="email"
                    required
                    placeholder="director@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                  Profile Photo URL (Optional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                  <Input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="pl-10 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 text-xs font-mono"
                  />
                </div>

                {/* Inline Password Requirement Checkpoints */}
                <div className="mt-2.5 p-3 rounded-xl bg-surface-secondary/70 border border-border/80 space-y-1.5 text-xs font-mono">
                  <p className="font-semibold text-foreground text-[10px] uppercase tracking-wider mb-1">
                    Password Security Criteria:
                  </p>
                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-muted-foreground/60" />
                    )}
                    <span className={hasMinLength ? "text-foreground font-medium" : "text-muted-foreground"}>
                      Minimum 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasUppercase ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-muted-foreground/60" />
                    )}
                    <span className={hasUppercase ? "text-foreground font-medium" : "text-muted-foreground"}>
                      At least one uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLowercase ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-muted-foreground/60" />
                    )}
                    <span className={hasLowercase ? "text-foreground font-medium" : "text-muted-foreground"}>
                      At least one lowercase letter (a-z)
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full mt-4 font-mono font-bold tracking-wider uppercase text-xs rounded-xl shadow-hover"
                isLoading={isSubmitting}
                disabled={isSubmitting || !name || !email || !isPasswordValid}
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-mono">
                <span className="bg-card px-2 text-muted-foreground font-medium text-[10px] tracking-wider">
                  Or register with
                </span>
              </div>
            </div>

            {/* Google Social Registration Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border-border hover:bg-surface-secondary text-foreground text-xs uppercase tracking-wider font-mono font-semibold"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-border/70 pt-4 text-xs text-muted-foreground font-sans">
            <span>Already have an account?</span>
            <Link href="/login" className="text-accent font-semibold ml-1.5 hover:underline font-mono">
              Log In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
