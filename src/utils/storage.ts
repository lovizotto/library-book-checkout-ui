import { LibraryState } from "@/types";
import { seedData } from "@/data/seed";
import { STORAGE_KEY } from "@/constants";

export function loadState(): LibraryState {
  if (typeof window === "undefined") return seedData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedData;
  } catch {
    return seedData;
  }
}

export function saveState(state: LibraryState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
