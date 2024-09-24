"use client";

import { SessionProvider } from "next-auth/react";

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
}
