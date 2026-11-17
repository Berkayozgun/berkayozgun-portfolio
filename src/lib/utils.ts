import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Project } from "@/types/profile"

const CUSTOM_PREVIEW_IDS = new Set(['numbrias', 'wakelarm', 'myrrh', 'amerikano']);

export function hasCustomPreview(projectId: Project['id']): boolean {
  return CUSTOM_PREVIEW_IDS.has(String(projectId));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
