"use client";

import { useState } from "react";
import { logs, Log } from "../data/logs";
// import { LogSidebar } from '../components/LogSidebar'
// import { LogContent } from '../components/LogContent'
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LogPage() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const handleSelectLog = (log: Log) => {
    setSelectedLog(log);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* <LogSidebar 
          logs={logs} 
          onSelectLog={handleSelectLog} 
          selectedLogId={selectedLog?.id || null}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <LogContent selectedLog={selectedLog} />
        </main> */}
      </div>
    </SidebarProvider>
  );
}
