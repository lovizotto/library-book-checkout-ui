import { LibraryState } from "@/types";

// Single reference point — all seed dates are relative to midnight UTC today.
// This ensures server and client compute identical values during hydration.
const TODAY = new Date();
TODAY.setUTCHours(0, 0, 0, 0);

function daysAgo(n: number): string {
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString();
}

function daysFromNow(n: number): string {
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString();
}

export const seedData: LibraryState = {
  books: [
    { id: "b1", title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884" },
    { id: "b2", title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt", isbn: "978-0135957059" },
    { id: "b3", title: "Refactoring", author: "Martin Fowler", isbn: "978-0134757599" },
    { id: "b4", title: "Design Patterns", author: "Gang of Four", isbn: "978-0201633610" },
    { id: "b5", title: "You Don't Know JS", author: "Kyle Simpson", isbn: "978-1491950296" },
  ],
  members: [
    { id: "m1", name: "Alice Johnson" },
    { id: "m2", name: "Bob Smith" },
    { id: "m3", name: "Carol Davis" },
  ],
  checkouts: [
    { id: "c1", bookId: "b1", memberId: "m1", checkedOutAt: daysAgo(5), dueDate: daysFromNow(9), returnedAt: null },
    { id: "c2", bookId: "b2", memberId: "m2", checkedOutAt: daysAgo(30), dueDate: daysAgo(16), returnedAt: null },
    { id: "c3", bookId: "b4", memberId: "m3", checkedOutAt: daysAgo(25), dueDate: daysAgo(11), returnedAt: null },
    { id: "c4", bookId: "b3", memberId: "m1", checkedOutAt: daysAgo(20), dueDate: daysAgo(6), returnedAt: daysAgo(8) },
  ],
};
