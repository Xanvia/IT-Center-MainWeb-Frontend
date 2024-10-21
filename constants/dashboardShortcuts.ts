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
    href: "/dashboard/lab-reservation",
    visual: "/common/labReservation.jpg",
    primary: true,
  },
  {
    name: "Register as Student",
    icon: UserPlus,
    href: "/dashboard/studentReg",
  },
  {
    name: "Register as Staff",
    icon: Users,
    href: "/dashboard/staffReg",
  },
  {
    name: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    name: "Manage Users",
    icon: Users,
    href: "/manage-users",
    adminOnly: true,
  },
  {
    name: "Manage Courses",
    icon: BookmarkPlus,
    href: "/manage-courses",
    adminOnly: true,
  },
  {
    name: "Manage Services",
    icon: ServerCogIcon,
    href: "/manage-services",
    adminOnly: true,
  },
  {
    name: "Manage Reservations",
    icon: CalendarRange,
    href: "/manage-reservations",
    adminOnly: true,
  },
];
