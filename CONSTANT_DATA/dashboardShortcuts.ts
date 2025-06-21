import {
  BookOpen,
  Globe,
  Calendar,
  UserPlus,
  Users,
  User,
  BookmarkPlus,
  CalendarRange,
  ServerCogIcon,
} from "lucide-react";

export const shortcuts = [
  {
    name: "Course Registration",
    icon: BookOpen,
    href: "/dashboard/courseRegistration",
    visual: "/common/courseReg.jpg",
    primary: true,
  },
  {
    name: "IT Center Website",
    icon: Globe,
    href: "/",
    visual: "/common/mainWeb.jpg",
    primary: true,
  },
  {
    name: "Lab Reservation",
    icon: Calendar,
    href: "/reservation",
    visual: "/common/labReservation.jpg",
    primary: true,
  },
  {
    name: "Register as Student",
    icon: UserPlus,
    href: "/dashboard/studentReg",
    userOnly: true,
  },
  {
    name: "Register as Staff",
    icon: Users,
    href: "/dashboard/staffReg",
    userOnly: true,
  },
  {
    name: "Profile",
    icon: User,
    href: "/dashboard/profile",
    staffStuOnly: true,
  },
  {
    name: "Course Enrollment",
    icon: BookOpen,
    href: "/dashboard/enrolledCourses",
    staffStuOnly: true,
  },
  {
    name: "Manage Staff",
    icon: Users,
    href: "/dashboard/admin/users/staff",
    adminOnly: true,
  },
  {
    name: "Manage Courses",
    icon: BookmarkPlus,
    href: "/dashboard/admin/courses/manageCourses",
    adminOnly: true,
  },
  {
    name: "Manage Services",
    icon: ServerCogIcon,
    href: "/dashboard/admin/services/log",
    adminOnly: true,
  },
  {
    name: "Manage Reservations",
    icon: CalendarRange,
    href: "/dashboard/admin/reservations/requests",
    adminOnly: true,
  },
];
