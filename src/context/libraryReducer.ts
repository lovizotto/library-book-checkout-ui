import { LibraryState, LibraryAction } from "@/types";
import { CHECKOUT_DURATION_DAYS } from "@/constants";

export function libraryReducer(state: LibraryState, action: LibraryAction): LibraryState {
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
