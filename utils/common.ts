import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbsoluteImageUrl(url: string | undefined) {
  return url?.startsWith("uploads")
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`
    : url;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function addOneDaytoDateString(dateString: string) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj);
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
 * Sorts courses by starting date with special handling for "Throughout the year" courses.
 * Courses that run "Throughout the year" appear first, followed by courses sorted by starting date.
 *
 * @param courses - Array of courses to sort
 * @returns Sorted array of courses
 */
export function sortCoursesByStartingDate<
  T extends { startingDate: string; registrationDeadline: string }
>(courses: T[]): T[] {
  return courses.sort((a, b) => {
    // Check if either course is "Throughout the year"
    const aIsThroughoutYear =
      a.registrationDeadline?.toLowerCase().includes("throughout the year") ||
      a.startingDate?.toLowerCase().includes("throughout the year");
    const bIsThroughoutYear =
      b.registrationDeadline?.toLowerCase().includes("throughout the year") ||
      b.startingDate?.toLowerCase().includes("throughout the year");

    // If both are "Throughout the year", maintain their current order
    if (aIsThroughoutYear && bIsThroughoutYear) {
      return 0;
    }

    // "Throughout the year" courses come first
    if (aIsThroughoutYear && !bIsThroughoutYear) {
      return -1;
    }

    if (!aIsThroughoutYear && bIsThroughoutYear) {
      return 1;
    }

    // Both have specific dates - sort by starting date
    if (a.startingDate && b.startingDate) {
      const dateA = new Date(a.startingDate);
      const dateB = new Date(b.startingDate);

      // Handle invalid dates
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
        return 0;
      }
      if (isNaN(dateA.getTime())) {
        return 1; // Invalid dates go to the end
      }
      if (isNaN(dateB.getTime())) {
        return -1; // Invalid dates go to the end
      }

      return dateA.getTime() - dateB.getTime();
    }

    // Handle cases where one or both don't have starting dates
    if (!a.startingDate && !b.startingDate) {
      return 0;
    }
    if (!a.startingDate) {
      return 1; // Courses without dates go to the end
    }
    if (!b.startingDate) {
      return -1; // Courses without dates go to the end
    }

    return 0;
  });
}
