"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types";
import { apiClient } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    photoUrl?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  syncSocialLogin: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async (isRetry = false) => {
    try {
      const response = await apiClient<{ user: User }>("/api/auth/me", {
        method: "GET",
      });

      if (response && response.user) {
        setUser(response.user);
        setIsLoading(false);
      } else if (!isRetry) {
        // Quick retry after 500ms to catch newly redirected OAuth sessions
        setTimeout(() => refreshUser(true), 500);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      if (!isRetry) {
        setTimeout(() => refreshUser(true), 500);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Re-check authentication when the tab regains focus or visibility (e.g. returning from OAuth window)
  useEffect(() => {
    const handleFocus = () => {
      refreshUser();
    };
    window.addEventListener("focus", handleFocus);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        refreshUser();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response && response.user) {
        setUser(response.user);
        return { success: true, message: response.message || "Logged in successfully" };
      }
      return { success: false, message: response.message || "Invalid credentials" };
    } catch (error: any) {
      return { success: false, message: error.message || "Login failed. Please try again." };
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    photoUrl?: string;
  }) => {
    try {
      const response = await apiClient("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return {
        success: true,
        message: response.message || "Registration successful! You may now log in.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Registration failed. Please check your details.",
      };
    }
  };

  const logout = async () => {
    try {
      await apiClient("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.warn("Logout notification error:", error);
    } finally {
      setUser(null);
    }
  };

  const syncSocialLogin = async (userData: any) => {
    try {
      const response = await apiClient<{ user: User }>("/api/auth/sync-social", {
        method: "POST",
        body: JSON.stringify({ user: userData }),
      });

      if (response && response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Failed to synchronize social auth:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        syncSocialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
