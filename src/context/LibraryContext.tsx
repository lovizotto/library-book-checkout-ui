"use client";

import { createContext, useReducer, useEffect, ReactNode } from "react";
import { LibraryState, LibraryAction } from "@/types";
import { seedData } from "@/data/seed";

const STORAGE_KEY = "library-state";
const CHECKOUT_DURATION_DAYS = 14;

function loadState(): LibraryState {
  if (typeof window === "undefined") return seedData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedData;
  } catch {
    return seedData;
  }
}

function reducer(state: LibraryState, action: LibraryAction): LibraryState {
  switch (action.type) {
    case "CHECKOUT_BOOK": {
      const { bookId, memberId } = action.payload;
      const now = new Date();
      const due = new Date(now);
      due.setDate(due.getDate() + CHECKOUT_DURATION_DAYS);
      return {
        ...state,
        checkouts: [
          ...state.checkouts,
          {
            id: crypto.randomUUID(),
            bookId,
            memberId,
            checkedOutAt: now.toISOString(),
            dueDate: due.toISOString(),
            returnedAt: null,
          },
        ],
      };
    }
    case "RETURN_BOOK":
      return {
        ...state,
        checkouts: state.checkouts.map((c) =>
          c.id === action.payload.checkoutId
            ? { ...c, returnedAt: new Date().toISOString() }
            : c
        ),
      };
  }
}

export const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}>({ state: seedData, dispatch: () => {} });

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}
