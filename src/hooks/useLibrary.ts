"use client";

import { useContext, useMemo, useCallback } from "react";
import { LibraryContext } from "@/context/LibraryContext";

export function useLibrary() {
  const { state, dispatch } = useContext(LibraryContext);

  const activeCheckouts = useMemo(
    () => state.checkouts.filter((c) => !c.returnedAt),
    [state.checkouts]
  );

  const overdueCheckouts = useMemo(() => {
    const now = new Date();
    return activeCheckouts.filter((c) => new Date(c.dueDate) < now);
  }, [activeCheckouts]);

  const isAvailable = useCallback(
    (bookId: string) => !activeCheckouts.some((c) => c.bookId === bookId),
    [activeCheckouts]
  );

  const getCheckoutForBook = useCallback(
    (bookId: string) => activeCheckouts.find((c) => c.bookId === bookId),
    [activeCheckouts]
  );

  const getBook = useCallback(
    (id: string) => state.books.find((b) => b.id === id),
    [state.books]
  );

  const getMember = useCallback(
    (id: string) => state.members.find((m) => m.id === id),
    [state.members]
  );

  const checkout = useCallback(
    (bookId: string, memberId: string) => {
      dispatch({ type: "CHECKOUT_BOOK", payload: { bookId, memberId } });
    },
    [dispatch]
  );

  const returnBook = useCallback(
    (checkoutId: string) => {
      dispatch({ type: "RETURN_BOOK", payload: { checkoutId } });
    },
    [dispatch]
  );

  return {
    ...state,
    activeCheckouts,
    overdueCheckouts,
    isAvailable,
    getCheckoutForBook,
    getBook,
    getMember,
    checkout,
    returnBook,
  };
}
