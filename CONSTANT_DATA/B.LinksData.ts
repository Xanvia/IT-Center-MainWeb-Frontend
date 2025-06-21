export type mainLinkDataTypes = {
  url: string;
  id: string;
  imgsrc: string;
  options: React.CSSProperties;
  description: string;
};

export const mainLinkData: mainLinkDataTypes[] = [
  {
    url: "/courses",
    id: "Courses",
    imgsrc: "/animation/courses.json",
    options: {},
    description:
      "Offers diverse IT-related courses to enhance skills in programming, networking, and developing for all levels.",
  },
  {
    url: "/reservation",
    id: "Reservation",
    imgsrc: "/animation/reservation.json",
    options: { scale: "110%", transform: "translateX(-0.75rem)" },
    description:
      "Book IT center labs equipped with state-of-the-art resources for practical sessions, workshops, and personal projects.",
  },
  {
    url: "/consultation",
    id: "Consultation",
    imgsrc: "/animation/consultation.json",
    options: { scale: "110%", transform: "translateY(1rem)" },
    description:
      "Provides expert guidance on IT-related topics, career advice, and project development through personalized consultations.",
  },
  {
    url: "/opened",
    id: "O P E N E D",
    imgsrc: "/logo/logo-opened.jpg",
    options: { scale: "150%" },
    description:
      "An online platform delivering flexible, self-paced courses to learn IT skills anytime, anywhere with certified instructors.",
  },
];

export type footerLinksTypes = {
  url: string;
  id: string;
};

export const footerServicesLinks: footerLinksTypes[] = [
  {
    url: "/services/projects",
    id: "Projects",
  },
  {
    url: "/services/consultations",
    id: "Consultations",
  },
  {
    url: "/services/logs",
    id: "Logs",
  },
  {
    url: "/news",
    id: "News",
  },
];

export const footerOurLinks: footerLinksTypes[] = [
  {
    url: "/reservation",
    id: "Reservations",
  },
  {
    url: "/opened",
    id: "O P E N E D",
  },
  {
    url: "/dashboard/courseRegistration",
    id: "Course Registartion",
  },
  {
    url: "/aboutus/staff",
    id: "Staff",
  },
];

export const footerOtherLinks: footerLinksTypes[] = [
  {
    url: "/auth/signin",
    id: "Login",
  },
  {
    url: "https://www.pdn.ac.lk/",
    id: "University of Peradeniya",
  },
  {
    url: "https://www.google.com/maps?ll=7.260475,80.608469&z=12&t=m&hl=en-US&gl=US&mapclient=embed",
    id: "View in Map",
  },
];
