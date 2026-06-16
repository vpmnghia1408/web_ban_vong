import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Replaces `clsx` with `twMerge` for proper Tailwind conflict resolution
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { cn };
