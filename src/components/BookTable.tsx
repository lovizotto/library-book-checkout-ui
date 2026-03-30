"use client";

import { useState } from "react";
import { Book } from "@/types";
import { useLibrary } from "@/hooks/useLibrary";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { CheckoutModal } from "./CheckoutModal";

type Filter = "all" | "available" | "overdue";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "overdue", label: "Overdue" },
];

export function BookTable() {
  const { books, isAvailable, getCheckoutForBook, getMember, returnBook } = useLibrary();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [checkingOut, setCheckingOut] = useState<Book | null>(null);

  const filtered = books.filter((book) => {
    if (search) {
      const q = search.toLowerCase();
      if (!book.title.toLowerCase().includes(q) && !book.author.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filter === "available") return isAvailable(book.id);
    if (filter === "overdue") {
      const c = getCheckoutForBook(book.id);
      return c && new Date(c.dueDate) < new Date();
    }
    return true;
  });

  return (
    <>
      {/* Toolbar: search + filter pills */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm shadow-sm transition-colors placeholder:text-gray-300 focus:border-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-1 rounded-lg bg-gray-100/80 p-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                <th className="px-4 py-3">Book</th>
                <th className="hidden px-4 py-3 sm:table-cell">Status</th>
                <th className="hidden px-4 py-3 md:table-cell">Borrower</th>
                <th className="hidden px-4 py-3 md:table-cell">Due</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((book) => {
                const available = isAvailable(book.id);
                const active = getCheckoutForBook(book.id);
                const borrower = active ? getMember(active.memberId) : null;
                const overdue = active ? new Date(active.dueDate) < new Date() : false;

                return (
                  <tr key={book.id} className="transition-colors hover:bg-gray-50/80">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{book.title}</p>
                      <p className="text-xs text-gray-400">{book.author}</p>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <Badge variant={available ? "green" : overdue ? "red" : "yellow"}>
                        {available ? "Available" : overdue ? "Overdue" : "Checked out"}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                      {borrower?.name ?? "\u2014"}
                    </td>
                    <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                      {active
                        ? new Date(active.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {available ? (
                        <Button onClick={() => setCheckingOut(book)}>Check out</Button>
                      ) : (
                        <Button variant="ghost" onClick={() => returnBook(active!.id)}>
                          Return
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No books match your search
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 px-4 py-2.5 text-xs tabular-nums text-gray-400">
          Showing {filtered.length} of {books.length} books
        </div>
      </div>

      {/* Checkout modal — single instance, no repeated dropdowns */}
      {checkingOut && (
        <CheckoutModal book={checkingOut} onClose={() => setCheckingOut(null)} />
      )}
    </>
  );
}
