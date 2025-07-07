// utils.ts
// Utility function for merging Tailwind CSS class names using clsx and tailwind-merge.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge class names with Tailwind CSS support
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
