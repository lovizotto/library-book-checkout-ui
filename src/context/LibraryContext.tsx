"use client";

import { createContext, useReducer, useEffect, ReactNode } from "react";
import { LibraryState, LibraryAction } from "@/types";
import { seedData } from "@/data/seed";
import { libraryReducer } from "./libraryReducer";
import { loadState, saveState } from "@/utils/storage";

export const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}>({ state: seedData, dispatch: () => {} });

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(libraryReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}
