"use client";

import { useState } from "react";
import { courses, requests, Course, Request } from "./data";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import CourseSidebar from "../../../component/courses/courseSideBar";
import RequestsTable from "../../../component/courses/requestsTable";

const StudentsPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedState, setSelectedState] = useState<Request["state"] | "ALL">(
    "ALL"
  );

  const filteredRequests = requests.filter(
    (request) =>
      (!selectedCourse || request.courseId === selectedCourse.id) &&
      (selectedState === "ALL" || request.state === selectedState)
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="w-64">
          <SidebarContent>
            <CourseSidebar
              courses={courses}
              selectedCourse={selectedCourse}
              onSelectCourse={setSelectedCourse}
            />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SidebarTrigger>
              <h1 className="ml-4 text-2xl font-semibold">
                LMS Admin Dashboard
              </h1>
            </div>
            <Input className="w-64" placeholder="Search requests..." />
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow">
              <div className="flex border-b">
                {["ALL", "PENDING", "NOTPAID", "REJECTED", "ENROLLED"].map(
                  (state) => (
                    <Button
                      key={state}
                      variant={selectedState === state ? "default" : "ghost"}
                      onClick={() =>
                        setSelectedState(state as Request["state"] | "ALL")
                      }
                      className="rounded-none"
                    >
                      {state}
                    </Button>
                  )
                )}
              </div>
              <RequestsTable requests={filteredRequests} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentsPage;
