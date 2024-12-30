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
