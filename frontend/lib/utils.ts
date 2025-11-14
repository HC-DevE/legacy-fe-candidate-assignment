import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

export function truncateSignature(signature: string, chars = 4): string {
  return `${signature.substring(0, chars + 2)}...${signature.substring(
    132 - chars
  )}`;
}

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}
