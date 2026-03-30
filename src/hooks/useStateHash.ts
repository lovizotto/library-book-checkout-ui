"use client";

import { useContext, useMemo } from "react";
import { LibraryContext } from "@/context/LibraryContext";

function hash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function useStateHash() {
  const { state } = useContext(LibraryContext);
  return useMemo(() => hash(JSON.stringify(state)), [state]);
}
