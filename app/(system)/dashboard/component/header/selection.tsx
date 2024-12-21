"use client";

import { useSession } from "next-auth/react";
import { SignButtons } from "./signButtons";
import DropdownNotification from "./notification";
import DropdownProfile from "./profile";

export default function Selection() {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <>
        <ul className="flex items-center gap-2 sm:gap-4">
          <DropdownNotification />
        </ul>
        <DropdownProfile />
      </>
    );
  else return <SignButtons />;
}
