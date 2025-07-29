"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  serverSession: any;
}

export default function AuthWrapper({
  children,
  serverSession,
}: AuthWrapperProps) {
  const { data: clientSession, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state only while the client-side session is being resolved
  // and we don't have a server session to fall back to
  if (!isClient || (status === "loading" && !serverSession)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Always render children - dashboard should be accessible to everyone
  // The session state will be handled by individual components
  return <>{children}</>;
}
