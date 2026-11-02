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
import { Check, X, User, Mail, Lock, Image as ImageIcon, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Inline password criteria evaluation
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements before registering.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        photoUrl: photoUrl.trim() || undefined,
        password,
      });

      if (res.success) {
        toast.success(res.message || "Registration successful! Please log in.");
        router.push("/login");
      } else {
        setGeneralError(res.message || "Registration failed");
        toast.error(res.message || "Registration failed");
      }
    } catch (err: any) {
      const msg = err.message || "Registration failed. Please try again.";
      setGeneralError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-surface-secondary/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" />
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-3">
            Join the Creative Studio Network
          </p>
        </div>

        <Card className="border-border shadow-modal rounded-2xl bg-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-serif text-2xl font-bold">Create Creator Account</CardTitle>
            <CardDescription className="text-xs">
              Book hourly workspaces or list your own production stages
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {generalError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  {generalError}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

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
                    placeholder="director@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Profile Photo URL (Optional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Password
                </label>
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

                {/* Inline Password Requirement Checkpoints */}
                <div className="mt-2.5 p-3 rounded-xl bg-surface-secondary/70 border border-border/80 space-y-1.5 text-xs">
                  <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider mb-1">
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
                className="w-full mt-4 font-semibold tracking-wider uppercase text-xs rounded-xl shadow-hover"
                isLoading={isSubmitting}
                disabled={isSubmitting || !name || !email || !isPasswordValid}
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-border/70 pt-4 text-xs text-muted-foreground">
            <span>Already have an account?</span>
            <Link href="/login" className="text-accent font-semibold ml-1.5 hover:underline">
              Log In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
