"use client";

import { useSession } from "next-auth/react";
import { SignButtons } from "./signButtons";
import DropdownNotification from "./notification";
import DropdownProfile from "./profile";
import { useEffect, useState } from "react";

interface SelectionProps {
  serverSession?: any;
}

export default function Selection({ serverSession }: SelectionProps = {}) {
  const { data: clientSession, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use client session if available, otherwise fall back to server session
  const session = clientSession || serverSession;

  // Show loading state while session is being resolved on client side
  // but only if we don't have a server session to fall back to
  if ((status === "loading" && !serverSession) || !isClient) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (session && session.user) {
    return (
      <>
        <ul className="flex items-center gap-2 sm:gap-4">
          <DropdownNotification />
        </ul>
        <DropdownProfile />
      </>
    );
  } else {
    return <SignButtons />;
  }
}
