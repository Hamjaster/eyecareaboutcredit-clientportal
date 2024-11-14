import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  if (!fullName) return "";

  const nameParts = fullName.split(" ").filter(Boolean); // Split name by space and filter out empty strings
  const initials = nameParts
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return initials;
}
