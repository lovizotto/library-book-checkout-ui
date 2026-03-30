import { Book, EnrichedBook } from "@/types";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export function enrichBooks(
  books: Book[],
  isAvailable: (id: string) => boolean,
  getCheckoutForBook: (id: string) => { memberId: string; dueDate: string; id: string } | undefined,
  getMember: (id: string) => { name: string } | undefined,
): EnrichedBook[] {
  const now = new Date();
  return books.map((book) => {
    const active = getCheckoutForBook(book.id);
    const available = isAvailable(book.id);
    const overdue = active ? new Date(active.dueDate) < now : false;
    return {
      book,
      available,
      overdue,
      borrowerName: active ? getMember(active.memberId)?.name : undefined,
      dueDate: active ? dateFormat.format(new Date(active.dueDate)) : undefined,
      checkoutId: active?.id,
    };
  });
}
