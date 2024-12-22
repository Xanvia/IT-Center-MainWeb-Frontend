import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Course } from "../../admin/courses/students/data";

interface CourseSidebarProps {
  courses: Course[];
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
}

export default function CourseSidebar({
  courses,
  selectedCourse,
  onSelectCourse,
}: CourseSidebarProps) {
  return (
    <div className="py-4">
      <h2 className="px-4 text-lg font-semibold mb-2">Courses</h2>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onSelectCourse(null)}
            isActive={selectedCourse === null}
          >
            All Courses
          </SidebarMenuButton>
        </SidebarMenuItem>
        {courses.map((course) => (
          <SidebarMenuItem key={course.id}>
            <SidebarMenuButton
              onClick={() => onSelectCourse(course)}
              isActive={selectedCourse?.id === course.id}
            >
              {course.name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
