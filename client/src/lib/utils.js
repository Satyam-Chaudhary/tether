import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottieAnimations/loader2";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colorOptions = [
  { name: "Sky", value: "bg-sky-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Amber", value: "bg-amber-500" },
];

export const getShadowClass = (bgColor) => {
  if (!bgColor) return "shadow-gray-500/50"; // Default shadow

  return `${bgColor.replace("bg-", "shadow-")}/30`;
};

export const getInitials = (firstName, lastName, email) => {
  if (firstName) {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  } else if (email) {
    return email.charAt(0).toUpperCase();
  }
  return "X";
};




export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }
}