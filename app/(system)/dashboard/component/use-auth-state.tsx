"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UseAuthStateProps {
  serverSession?: any;
}

export function useAuthState({ serverSession }: UseAuthStateProps = {}) {
  const { data: clientSession, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use client session if available, otherwise fall back to server session
  const session = clientSession || serverSession;

  // Determine loading state
  const isLoading = !isClient || (status === "loading" && !serverSession);

  // Determine authentication state
  const isAuthenticated = !!session?.user;

  // Determine if we should show authenticated UI
  const showAuthenticatedUI = isAuthenticated && (isClient || !!serverSession);

  return {
    session,
    isLoading,
    isAuthenticated,
    showAuthenticatedUI,
    status,
    isClient,
  };
}
