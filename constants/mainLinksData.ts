type mainLinkDataTypes = {
  url: string;
  headline: string;
  imgsrc: string;
  options?: string;
  description: string;
};

export const mainLinkData: mainLinkDataTypes[] = [
  {
    url: "/courses",
    headline: "Courses",
    imgsrc: "/animation/courses.json",
    options: "",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/reservation",
    headline: "Reservation",
    imgsrc: "/animation/reservation.json",
    options: "scale-110 -translate-y-3",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/consultation",
    headline: "Consultation",
    imgsrc: "/animation/consultation.json",
    options: "translate-y-4 scale-110",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    url: "/opened",
    headline: "O P E N E D",
    imgsrc: "/animation/opened.json",
    options: "scale-150",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
];
