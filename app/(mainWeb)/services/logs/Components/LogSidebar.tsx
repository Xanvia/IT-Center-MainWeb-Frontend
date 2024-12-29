import { useState } from 'react'
import { Log } from '../data/logs'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface LogSidebarProps {
  logs: Log[];
  onSelectLog: (log: Log) => void;
  selectedLogId: string | null;
}

export function LogSidebar({ logs, onSelectLog, selectedLogId }: LogSidebarProps) {
  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">Log Entries</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {logs.map((log) => (
            <SidebarMenuItem key={log.id}>
              <SidebarMenuButton
                onClick={() => onSelectLog(log)}
                isActive={log.id === selectedLogId}
              >
                {log.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

