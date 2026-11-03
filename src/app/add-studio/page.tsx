"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useAuth } from "@/context/auth-context";
import { studioApi } from "@/lib/api";
import { StudioCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Building2,
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  Check,
  Plus,
  ArrowRight,
  Upload,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
  "Acoustic Soundproofing",
  "Dedicated 3-Phase Power",
  "Pre-Rigged Overhead Lighting Grid",
  "Chroma Key Green Screen",
  "Shure SM7B Broadcast Mics",
  "Vocal Isolation Booth",
  "Full Hair & Makeup Station",
  "Wardrobe Racks & Steamer",
  "High-Speed Fiber WiFi (1 Gbps)",
  "Private Green Room & Lounge",
  "Ground-Level Drive-In Loading",
  "Air Conditioning & Silent HVAC",
  "Refreshment & Coffee Bar",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<StudioCategory>("Photo Studio");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [securityDeposit, setSecurityDeposit] = useState<number | "">("");
  const [maxCapacity, setMaxCapacity] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-Speed Fiber WiFi (1 Gbps)",
    "Air Conditioning & Silent HVAC",
  ]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [overview, setOverview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Image Upload handler
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Studio title is required.");
      return;
    }
    if (!hourlyRate || Number(hourlyRate) <= 0) {
      setErrorMessage("Please specify a valid hourly rental rate.");
      return;
    }
    if (!maxCapacity || Number(maxCapacity) <= 0) {
      setErrorMessage("Please specify the maximum crew capacity.");
      return;
    }
    if (!location.trim()) {
      setErrorMessage("Studio location is required.");
      return;
    }
    if (!imageUrl.trim()) {
      setErrorMessage("Please provide a primary studio photo URL or upload an image.");
      return;
    }
    if (imageUrl.startsWith("data:")) {
      setErrorMessage(
        "Embedded base64 preview data cannot be stored in production MongoDB. Please provide a direct hosted image URL (e.g. Unsplash, ImgBB, Cloudinary, AWS S3)."
      );
      return;
    }
    if (!overview.trim() || overview.trim().length < 20) {
      setErrorMessage("Please provide a comprehensive space overview (at least 20 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await studioApi.create({
        title: title.trim(),
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: securityDeposit ? Number(securityDeposit) : 0,
        maxCapacity: Number(maxCapacity),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        amenities: selectedAmenities,
        overview: overview.trim(),
      });

      toast.success(res.message || "Studio published successfully!");
      router.push("/my-listings");
    } catch (err: any) {
      const msg = err.data?.message || err.message || "Failed to create studio listing.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-24">
        {/* Header Banner */}
        <section className="bg-surface-secondary/70 border-b border-border py-14">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host a Space</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              List Your Studio Space
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              List your daylight studio, sound stage, podcast lounge, or creative space for rent to creators.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8 max-w-5xl">
          {errorMessage && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs leading-relaxed font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Studio Identity */}
              <Card className="border-border rounded-2xl bg-card shadow-subtle">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-serif font-bold">1. Studio Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Studio Title *
                    </label>
                    <Input
                      required
                      placeholder="e.g. The Daylight Loft & Infinite Cyclorama"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                        Discipline / Category *
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
                          placeholder="e.g. 25"
                          value={maxCapacity}
                          onChange={(e) => setMaxCapacity(e.target.value ? Number(e.target.value) : "")}
                          className="pl-10 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                      Physical Location / City &amp; Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                      <Input
                        required
                        placeholder="e.g. 420 Industrial Ave, Arts District, Brooklyn, NY"
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
                  <CardTitle className="text-base font-serif font-bold">2. Pricing &amp; Security Deposit</CardTitle>
                  <CardDescription className="text-xs font-mono">
                    Set your hourly rental rate and refundable security deposit
                  </CardDescription>
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
                        placeholder="e.g. 85"
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
                        placeholder="e.g. 150"
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
                  <CardDescription className="text-xs font-mono">
                    Upload an image or enter a direct hosted image URL
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                        Upload File
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent hover:bg-surface-secondary/50 transition-colors">
                        <Upload className="w-6 h-6 text-accent mb-2" />
                        <span className="text-xs font-mono font-semibold text-foreground">
                          {isUploading ? "Uploading..." : "Select Studio Photo"}
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
                        Or Hosted Image URL *
                      </label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-accent" />
                        <Input
                          placeholder="https://images.unsplash.com/..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="pl-10 font-mono text-xs"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground font-sans leading-tight">
                        Direct public HTTPS links only. Pre-configured Unsplash and hosted URLs load with instant optimization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities Checklist */}
              <Card className="border-border rounded-2xl bg-card shadow-subtle">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-serif font-bold">4. Amenities &amp; Included Equipment</CardTitle>
                  <CardDescription className="text-xs font-mono">
                    Select equipment, gear, and amenities available on-site
                  </CardDescription>
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

                  {/* Add Custom Amenity */}
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
                  <CardTitle className="text-base font-serif font-bold">5. Space Overview &amp; Guidelines</CardTitle>
                  <CardDescription className="text-xs font-mono">
                    Describe your studio layout, dimensions, access guidelines, and house rules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your studio layout, dimensions, ceiling height, gear access, and house rules..."
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full p-4 rounded-xl border border-input bg-surface text-xs leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1.5 focus:ring-accent focus:border-accent font-sans"
                  />
                </CardContent>
              </Card>

              {/* Submit CTA */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  isLoading={isSubmitting}
                  className="rounded-xl px-8 py-4 font-mono font-bold uppercase tracking-wider text-xs gap-2 shadow-hover"
                >
                  <span>Publish Studio Space</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Live Preview Card (4 cols) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground block">
                  LISTING PREVIEW
                </span>

                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
                  <div className="relative aspect-[16/10] w-full bg-surface-secondary">
                    {imageUrl ? (
                      <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/60 p-4 text-center">
                        <ImageIcon className="w-8 h-8 mb-1 text-accent/60" />
                        <span className="text-xs font-mono">Studio Photo Preview</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <div className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[9.5px] uppercase">
                        {category}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-serif font-bold text-base text-foreground line-clamp-1">
                      {title || "Untitled Studio Workspace"}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{location || "Location not specified"}</span>
                    </p>
                    <div className="pt-3 border-t border-border flex items-baseline justify-between font-mono">
                      <div>
                        <span className="font-serif text-xl font-bold text-foreground">
                          ${hourlyRate || "0"}
                        </span>
                        <span className="text-xs text-muted-foreground">/ hr</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        Max {maxCapacity || "0"} guests
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
