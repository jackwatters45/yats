import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getBaseURL = () =>
	import.meta.env.MODE === "production"
		? import.meta.env.PUBLIC_BASE_URL_PROD
		: import.meta.env.PUBLIC_BASE_URL_DEV;
