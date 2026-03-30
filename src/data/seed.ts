import { LibraryState } from "@/types";

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
    { id: "b6", title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson", isbn: "978-0262510875" },
    { id: "b7", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848" },
    { id: "b8", title: "The Art of Computer Programming", author: "Donald Knuth", isbn: "978-0201896831" },
    { id: "b9", title: "Domain-Driven Design", author: "Eric Evans", isbn: "978-0321125217" },
    { id: "b10", title: "Working Effectively with Legacy Code", author: "Michael Feathers", isbn: "978-0131177055" },
    { id: "b11", title: "Continuous Delivery", author: "Jez Humble & David Farley", isbn: "978-0321601919" },
    { id: "b12", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "978-1449373320" },
    { id: "b13", title: "Test Driven Development", author: "Kent Beck", isbn: "978-0321146533" },
    { id: "b14", title: "Patterns of Enterprise Application Architecture", author: "Martin Fowler", isbn: "978-0321127426" },
    { id: "b15", title: "The Mythical Man-Month", author: "Frederick Brooks", isbn: "978-0201835953" },
  ],
  members: [
    { id: "m1", name: "Alice Johnson" },
    { id: "m2", name: "Bob Smith" },
    { id: "m3", name: "Carol Davis" },
    { id: "m4", name: "David Lee" },
    { id: "m5", name: "Emma Wilson" },
    { id: "m6", name: "Frank Brown" },
    { id: "m7", name: "Grace Kim" },
    { id: "m8", name: "Henry Park" },
  ],
  checkouts: [
    { id: "c1", bookId: "b1", memberId: "m1", checkedOutAt: daysAgo(5), dueDate: daysFromNow(9), returnedAt: null },
    { id: "c2", bookId: "b2", memberId: "m2", checkedOutAt: daysAgo(30), dueDate: daysAgo(16), returnedAt: null },
    { id: "c3", bookId: "b4", memberId: "m3", checkedOutAt: daysAgo(25), dueDate: daysAgo(11), returnedAt: null },
    { id: "c4", bookId: "b3", memberId: "m1", checkedOutAt: daysAgo(20), dueDate: daysAgo(6), returnedAt: daysAgo(8) },
    { id: "c5", bookId: "b7", memberId: "m4", checkedOutAt: daysAgo(3), dueDate: daysFromNow(11), returnedAt: null },
    { id: "c6", bookId: "b9", memberId: "m5", checkedOutAt: daysAgo(18), dueDate: daysAgo(4), returnedAt: null },
    { id: "c7", bookId: "b12", memberId: "m6", checkedOutAt: daysAgo(2), dueDate: daysFromNow(12), returnedAt: null },
    { id: "c8", bookId: "b15", memberId: "m7", checkedOutAt: daysAgo(10), dueDate: daysFromNow(4), returnedAt: null },
    { id: "c9", bookId: "b11", memberId: "m2", checkedOutAt: daysAgo(15), dueDate: daysAgo(1), returnedAt: null },
    { id: "c10", bookId: "b8", memberId: "m8", checkedOutAt: daysAgo(28), dueDate: daysAgo(14), returnedAt: daysAgo(12) },
  ],
};
