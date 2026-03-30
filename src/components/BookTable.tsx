"use client";

import { lazy, Suspense, useState, useMemo } from "react";
import { Book } from "@/types";
import { useLibrary } from "@/hooks/useLibrary";
import { Badge } from "./Badge";
import { Button } from "./Button";

const CheckoutModal = lazy(() => import("./CheckoutModal"));

type View = "all" | "overdue";

const VIEWS: View[] = ["all", "overdue"];
const VIEW_LABELS: Record<View, string> = { all: "All books", overdue: "Overdue" };
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function StatusBadge({ available, overdue }: { available: boolean; overdue: boolean }) {
  const variant = available ? "green" : overdue ? "red" : "yellow";
  const label = available ? "Available" : overdue ? "Overdue" : "Checked out";
  return <Badge variant={variant}>{label}</Badge>;
}

export function BookTable() {
  const { books, isAvailable, getCheckoutForBook, getMember, overdueCheckouts, returnBook } =
    useLibrary();
  const [view, setView] = useState<View>("all");
  const [checkingOut, setCheckingOut] = useState<Book | null>(null);

  const rows = useMemo(() => {
    if (view !== "overdue") return books;
    const overdueBookIds = new Set(overdueCheckouts.map((c) => c.bookId));
    return books.filter((b) => overdueBookIds.has(b.id));
  }, [view, books, overdueCheckouts]);

  return (
    <>
      {/* Tabs: All / Overdue */}
      <nav className="mb-6 flex gap-1 rounded-xl bg-gray-100/80 p-1">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:flex-none ${
              view === v
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {VIEW_LABELS[v]}
            {v === "overdue" && overdueCheckouts.length > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                {overdueCheckouts.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Status</th>
              <th className="hidden px-4 py-3 md:table-cell">Borrower</th>
              <th className="hidden px-4 py-3 md:table-cell">Due</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((book) => {
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
                  <td className="px-4 py-3">
                    <StatusBadge available={available} overdue={overdue} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {borrower?.name ?? "\u2014"}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {active ? dateFormat.format(new Date(active.dueDate)) : "\u2014"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {available ? (
                      <Button onClick={() => setCheckingOut(book)}>Check out</Button>
                    ) : (
                      <Button variant="ghost" onClick={() => returnBook(active!.id)}>Return</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-400">No overdue checkouts</p>
        )}
      </div>

      {/* Mobile list */}
      <div className="space-y-3 sm:hidden">
        {rows.map((book) => {
          const available = isAvailable(book.id);
          const active = getCheckoutForBook(book.id);
          const borrower = active ? getMember(active.memberId) : null;
          const overdue = active ? new Date(active.dueDate) < new Date() : false;

          return (
            <div key={book.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{book.title}</p>
                  <p className="text-xs text-gray-400">{book.author}</p>
                </div>
                <StatusBadge available={available} overdue={overdue} />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                {available ? (
                  <Button className="w-full" onClick={() => setCheckingOut(book)}>Check out</Button>
                ) : (
                  <>
                    <p className="min-w-0 truncate text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{borrower?.name}</span>
                      <span className="mx-1 text-gray-300">&middot;</span>
                      <span>{`due ${dateFormat.format(new Date(active!.dueDate))}`}</span>
                    </p>
                    <Button variant="ghost" onClick={() => returnBook(active!.id)}>Return</Button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-400">No overdue checkouts</p>
        )}
      </div>

      {/* Checkout modal — lazy loaded */}
      {checkingOut && (
        <Suspense fallback={null}>
          <CheckoutModal book={checkingOut} onClose={() => setCheckingOut(null)} />
        </Suspense>
      )}
    </>
  );
}
