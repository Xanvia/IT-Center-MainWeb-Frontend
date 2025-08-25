"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { handleAuthError } from "@/utils/auth-error-handler";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Token refresh failed")) {
        handleAuthError(event.reason);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return (
    <SessionProvider
      refetchInterval={30} // Refetch session every 30 seconds
      refetchOnWindowFocus={true} // Refetch when window regains focus
    >
      <NextUIProvider>
        {children}
        <Toaster />
      </NextUIProvider>
    </SessionProvider>
  );
}
