// utils/auth-error-handler.ts
"use client";

import { signOut } from "next-auth/react";

export const handleAuthError = async (error: any) => {
  console.error("Authentication error:", error);

  // Check if it's a token-related error
  if (
    error?.message?.includes("RefreshToken") ||
    error?.message?.includes("Invalid Refresh Token") ||
    error?.message?.includes("Token refresh failed")
  ) {
    console.log("Token error detected, signing out user");

    // Sign out the user and redirect to sign-in page
    await signOut({
      callbackUrl: "/auth/signin",
      redirect: true,
    });
  }
};

// Hook to handle session errors
export const useAuthErrorHandler = () => {
  return { handleAuthError };
};

// Debug utility for image URLs
export const debugImageUrl = (
  url: string | undefined,
  context: string = ""
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`🖼️ Image URL Debug ${context}:`, {
      original: url,
      isAbsolute: url?.startsWith("/") || url?.includes(":/"),
      hasUploads: url?.includes("uploads"),
      envBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    });
  }
};
