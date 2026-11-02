"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import {
  Menu,
  X,
  User as UserIcon,
  PlusCircle,
  LayoutDashboard,
  Building,
  CalendarCheck,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky header shadow and backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been signed out successfully.");
      router.push("/");
    } catch {
      toast.error("Error signing out");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-subtle py-3"
          : "bg-background/95 backdrop-blur-sm border-b border-border/60 py-3.5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Logo size="md" />

        {/* Center: Desktop Navigation Links with Editorial Tracking */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-foreground/80 hover:text-foreground hover:bg-surface-secondary"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-accent rounded-full animate-in fade-in duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Auth State */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {isLoading ? (
            // Skeleton while checking auth state to prevent layout shift
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-surface-secondary" />
              <div className="w-20 h-4 rounded bg-surface-secondary" />
            </div>
          ) : isAuthenticated && user ? (
            // Authenticated User Dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1 pl-2 pr-3 rounded-full border border-border bg-surface-secondary/80 hover:bg-surface-secondary hover:border-accent/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-expanded={dropdownOpen}
                aria-label="User navigation menu"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-accent/20 border border-accent/40 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-accent" />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground max-w-[110px] truncate leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-muted-foreground uppercase leading-none">
                    {user.role || "Creator"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-muted-foreground ml-0.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-card p-1.5 shadow-modal text-card-foreground animate-in zoom-in-95 fade-in duration-150 z-50">
                  <div className="px-3 py-2 border-b border-border/70 mb-1">
                    <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">Call Sheet Identity</p>
                    <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-surface-secondary text-foreground transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-accent" />
                    <span>Dashboard Console</span>
                  </Link>

                  <Link
                    href="/add-studio"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-surface-secondary text-foreground transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-accent" />
                    <span>List New Studio</span>
                  </Link>

                  <Link
                    href="/my-listings"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-surface-secondary text-foreground transition-colors"
                  >
                    <Building className="w-4 h-4 text-accent" />
                    <span>My Studio Listings</span>
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-surface-secondary text-foreground transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4 text-accent" />
                    <span>My Bookings</span>
                  </Link>

                  <div className="h-px bg-border/70 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium rounded-lg text-rose-600 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Unauthenticated Buttons
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider font-semibold">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="accent" size="sm" className="text-xs uppercase tracking-wider font-semibold shadow-subtle">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-surface-secondary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 text-xs uppercase tracking-[0.14em] font-medium rounded-lg ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground hover:bg-surface-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 rounded-lg bg-surface-secondary/70 mb-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link href="/dashboard" className="w-full">
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs uppercase tracking-wider">
                    <LayoutDashboard className="w-4 h-4 text-accent" />
                    <span>Dashboard Console</span>
                  </Button>
                </Link>
                <Link href="/add-studio" className="w-full">
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs uppercase tracking-wider">
                    <PlusCircle className="w-4 h-4 text-accent" />
                    <span>List New Studio</span>
                  </Button>
                </Link>
                <Link href="/my-listings" className="w-full">
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs uppercase tracking-wider">
                    <Building className="w-4 h-4 text-accent" />
                    <span>My Studio Listings</span>
                  </Button>
                </Link>
                <Link href="/my-bookings" className="w-full">
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs uppercase tracking-wider">
                    <CalendarCheck className="w-4 h-4 text-accent" />
                    <span>My Bookings</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full justify-start gap-2 text-xs uppercase tracking-wider mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full text-xs uppercase tracking-wider font-semibold">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="accent" className="w-full text-xs uppercase tracking-wider font-semibold">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
