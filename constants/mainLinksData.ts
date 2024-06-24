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
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/reservation",
    id: "Reservation",
    imgsrc: "/animation/reservation.json",
    options: { scale: "110%", transform: "translateX(-0.75rem)" },
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/consultation",
    id: "Consultation",
    imgsrc: "/animation/consultation.json",
    options: { scale: "110%", transform: "translateY(1rem)" },
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/opened",
    id: "O P E N E D",
    imgsrc: "/animation/opened.json",
    options: { scale: "150%" },
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
];
