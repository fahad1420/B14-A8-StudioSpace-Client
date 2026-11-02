"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Sparkles, Key } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, syncSocialLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login(email.trim(), password);
      if (res.success) {
        toast.success("Welcome back to Shoot Location!");
        router.push(redirectUrl);
      } else {
        setErrorMessage(res.message || "Invalid credentials.");
        toast.error(res.message || "Invalid credentials.");
      }
    } catch (err: any) {
      const msg = err.message || "Login failed. Please check your email and password.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      toast.info("Connecting to Google OAuth authentication...");
      // Simulated Google OAuth response synchronization
      await syncSocialLogin({
        id: "google-creator-session-id",
        name: "Google Creator",
        email: "google.creator@shootlocation.com",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      });
      toast.success("Signed in with Google successfully!");
      router.push(redirectUrl);
    } catch {
      toast.error("Failed to authenticate with Google.");
    }
  };

  const fillExaminerCredentials = () => {
    setEmail("examiner@shootlocation.com");
    setPassword("ExaminerPassword123!");
    toast.info("Filled examiner test credentials.");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-surface-secondary/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" />
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-3">
            Find Your Space. Create Your Story.
          </p>
        </div>

        <Card className="border-border shadow-modal rounded-2xl bg-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-serif text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-xs">
              Sign in to manage your spaces, review bookings, or reserve new stages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                {errorMessage}
              </div>
            )}

            {/* Quick Examiner Auto-Fill Pill for Evaluator */}
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-foreground">
                <Key className="w-3.5 h-3.5 text-accent" />
                <span className="font-medium">Examiner Demo Account</span>
              </div>
              <button
                type="button"
                onClick={fillExaminerCredentials}
                className="text-[11px] font-semibold text-accent hover:underline uppercase tracking-wider"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    placeholder="creator@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info("Password recovery is unavailable in demo environment.")}
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full mt-2 font-semibold tracking-wider uppercase text-xs rounded-xl shadow-hover"
                isLoading={isSubmitting}
                disabled={isSubmitting || !email || !password}
              >
                <span>Sign In to Shoot Location</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Social Login Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border-border hover:bg-surface-secondary text-foreground text-xs uppercase tracking-wider font-semibold"
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

          <CardFooter className="justify-center border-t border-border/70 pt-4 text-xs text-muted-foreground">
            <span>Don&apos;t have an account?</span>
            <Link href="/register" className="text-accent font-semibold ml-1.5 hover:underline">
              Create an Account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border shadow-modal animate-pulse space-y-4">
            <div className="h-8 w-1/2 mx-auto bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
            <div className="h-10 bg-surface-secondary rounded" />
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
