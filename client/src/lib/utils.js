import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colorOptions = [
  { name: 'Sky', value: 'bg-sky-500' },
  { name: 'Emerald', value: 'bg-emerald-500' },
  { name: 'Rose', value: 'bg-rose-500' },
  { name: 'Amber', value: 'bg-amber-500' },
];


