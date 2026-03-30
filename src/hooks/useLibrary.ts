"use client";

import { useContext, useMemo } from "react";
import { LibraryContext } from "@/context/LibraryContext";

export function useLibrary() {
  const { state, dispatch } = useContext(LibraryContext);

  const activeCheckouts = useMemo(
    () => state.checkouts.filter((c) => !c.returnedAt),
    [state.checkouts]
  );

  const overdueCheckouts = useMemo(
    () => activeCheckouts.filter((c) => new Date(c.dueDate) < new Date()),
    [activeCheckouts]
  );

  const isAvailable = (bookId: string) =>
    !activeCheckouts.some((c) => c.bookId === bookId);

  const getCheckoutForBook = (bookId: string) =>
    activeCheckouts.find((c) => c.bookId === bookId);

  const getBook = (id: string) => state.books.find((b) => b.id === id);
  const getMember = (id: string) => state.members.find((m) => m.id === id);

  const checkout = (bookId: string, memberId: string) => {
    if (!isAvailable(bookId)) return;
    dispatch({ type: "CHECKOUT_BOOK", payload: { bookId, memberId } });
  };

  const returnBook = (checkoutId: string) =>
    dispatch({ type: "RETURN_BOOK", payload: { checkoutId } });

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
