"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useAuth } from "@/context/auth-context";
import { studioApi } from "@/lib/api";
import { Studio, StudioCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  Check,
  Plus,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  ChevronLeft,
  Upload,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES: StudioCategory[] = [
  "Photo Studio",
  "Sound Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const COMMON_AMENITIES = [
  "18ft Corner Cyclorama",
  "Diffused Daylight Windows",
  "Acoustically Soundproofed (NC-25)",
  "400A Camlock 3-Phase Power",
  "Pre-Rigged Overhead Lighting Grid",
  "Chroma Key Green Screen",
  "Shure SM7B Broadcast Mics",
  "Vocal Isolation Booth",
  "Full Hair & Makeup Station",
  "Wardrobe Racks & Steamer",
  "High-Speed Fiber WiFi (1 Gbps)",
  "Private Green Room & Lounge",
  "Drive-In Elephant Door Loading",
  "Air Conditioning & Silent HVAC",
  "Refreshment & Coffee Bar",
];

export default function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [studio, setStudio] = useState<Studio | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<StudioCategory>("Photo Studio");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [securityDeposit, setSecurityDeposit] = useState<number | "">("");
  const [maxCapacity, setMaxCapacity] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [overview, setOverview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    try {
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (imgbbKey) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data && data.data && data.data.url) {
          setImageUrl(data.data.url);
          toast.success("Studio photo uploaded to ImgBB successfully!");
          return;
        }
      }

      toast.info(
        "Direct ImgBB API key is not configured in environment. Please provide a direct publicly hosted image URL below."
      );
    } catch {
      toast.error("Failed to upload image. Please provide a direct image URL.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    async function loadStudio() {
      try {
        setIsLoading(true);
        const res = await studioApi.getById(studioId);
        if (res && res.data) {
          const s = res.data;
          setStudio(s);
          setTitle(s.title);
          setCategory(s.category);
          setHourlyRate(s.hourlyRate);
          setSecurityDeposit(s.securityDeposit || 0);
          setMaxCapacity(s.maxCapacity || 10);
          setLocation(s.location);
          setImageUrl(s.imageUrl);
          setSelectedAmenities(s.amenities || []);
          setOverview(s.overview);
        } else {
          setErrorMessage("Studio not found in database.");
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to load studio profile.");
      } finally {
        setIsLoading(false);
      }
    }

    if (studioId) loadStudio();
  }, [studioId]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      setSelectedAmenities((prev) => [...prev, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || !category || !hourlyRate || !location.trim() || !imageUrl.trim() || !overview.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (overview.trim().length < 20) {
      setErrorMessage("Overview must be at least 20 characters in length.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: securityDeposit ? Number(securityDeposit) : 0,
        maxCapacity: Number(maxCapacity) || 10,
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        amenities: selectedAmenities,
        overview: overview.trim(),
      };

      const res = await studioApi.update(studioId, payload);
      toast.success(res.message || "Studio updated successfully!");
      router.push("/my-listings");
    } catch (err: any) {
      const msg = err.data?.message || err.message || "Failed to update studio.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-6">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface-secondary/40 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link
                href="/my-listings"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono mb-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>RETURN TO MY LISTINGS</span>
              </Link>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-accent mb-1 block">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                <span>SPECIFICATION UPDATE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Edit Studio Listing
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMessage && (
              <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-3 font-mono">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Read-Only Host Profile Section */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-serif font-bold">Host Identity Verification</CardTitle>
                <CardDescription className="text-xs font-mono">
                  Stage ownership is verified on the backend before applying any updates
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Host Full Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={studio?.hostName || user?.name || ""}
                    className="w-full h-10 px-3.5 rounded-xl border border-border bg-surface-secondary text-foreground text-xs font-mono cursor-not-allowed opacity-80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Host Verified Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={studio?.hostEmail || user?.email || ""}
                    className="w-full h-10 px-3.5 rounded-xl border border-border bg-surface-secondary text-foreground text-xs font-mono cursor-not-allowed opacity-80"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Studio Identity */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-serif font-bold">1. Studio Identity &amp; Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                    Studio Title *
                  </label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as StudioCategory)}
                      aria-label="Studio category"
                      className="w-full h-10 px-3.5 rounded-xl border border-input bg-surface text-xs font-mono text-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Max Crew Capacity *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                      <Input
                        type="number"
                        required
                        min={1}
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(e.target.value ? Number(e.target.value) : "")}
                        className="pl-10 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                    Location / Physical Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                    <Input
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 font-sans"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Deposit */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-serif font-bold">2. Hourly Pricing &amp; Security</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                    Hourly Rental Rate ($ / hr) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                    <Input
                      type="number"
                      required
                      min={10}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value ? Number(e.target.value) : "")}
                      className="pl-10 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                    Refundable Security Deposit ($)
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                    <Input
                      type="number"
                      min={0}
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(e.target.value ? Number(e.target.value) : "")}
                      className="pl-10 font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media & Photography */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-serif font-bold">3. Studio Photography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Upload New File
                    </label>
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent hover:bg-surface-secondary/50 transition-colors">
                      <Upload className="w-6 h-6 text-accent mb-2" />
                      <span className="text-xs font-mono font-semibold text-foreground">
                        {isUploading ? "Uploading..." : "Replace Studio Photo"}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5">PNG, JPG, WebP up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Or Direct Image URL *
                    </label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                      <Input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="pl-10 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities Checklist */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-serif font-bold">4. Technical Equipment &amp; Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMMON_AMENITIES.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                          isChecked
                            ? "border-accent bg-accent/10 text-foreground font-semibold"
                            : "border-border bg-surface text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                            isChecked
                              ? "bg-accent border-accent text-accent-foreground"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs truncate font-mono">{amenity}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2 pt-2">
                  <Input
                    placeholder="Add custom gear, lighting, or facility..."
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomAmenity();
                      }
                    }}
                    className="text-xs font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCustomAmenity}
                    className="shrink-0 font-mono text-xs"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Overview & Rules */}
            <Card className="border-border rounded-2xl bg-card shadow-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-serif font-bold">5. Space Overview &amp; Production Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  required
                  rows={5}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full p-4 rounded-xl border border-input bg-surface text-xs leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent font-sans"
                />
              </CardContent>
            </Card>

            {/* Submit & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Link href="/my-listings">
                <Button variant="outline" type="button" className="font-mono text-xs uppercase">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isSubmitting}
                className="font-mono text-xs font-bold uppercase tracking-wider gap-2 shadow-hover"
              >
                <span>Save Stage Changes</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
