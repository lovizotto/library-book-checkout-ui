export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface Member {
  id: string;
  name: string;
}

export interface Checkout {
  id: string;
  bookId: string;
  memberId: string;
  checkedOutAt: string;
  dueDate: string;
  returnedAt: string | null;
}

export interface LibraryState {
  books: Book[];
  members: Member[];
  checkouts: Checkout[];
}

export type LibraryAction =
  | { type: "CHECKOUT_BOOK"; payload: { bookId: string; memberId: string } }
  | { type: "RETURN_BOOK"; payload: { checkoutId: string } };

export interface EnrichedBook {
  book: Book;
  available: boolean;
  overdue: boolean;
  borrowerName: string | undefined;
  dueDate: string | undefined;
  checkoutId: string | undefined;
}
