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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}
