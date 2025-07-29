"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import Header from "./header";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardContent({
  children,
  serverSession,
}: {
  children: React.ReactNode;
  serverSession?: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar  */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            serverSession={serverSession}
          />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
            <Toaster />
          </main>
        </div>
      </div>
    </main>
  );
}
