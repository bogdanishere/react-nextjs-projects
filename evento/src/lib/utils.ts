import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeCityWithCapital(city: string) {
  return city === "all"
    ? "All Cities"
    : city.slice(0, 1).toUpperCase() + city.slice(1);
}
