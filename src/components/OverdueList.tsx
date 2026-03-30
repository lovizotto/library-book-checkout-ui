"use client";

import { useLibrary } from "@/hooks/useLibrary";
import { Badge } from "./Badge";
import { Button } from "./Button";

export function OverdueList() {
  const { overdueCheckouts, getBook, getMember, returnBook } = useLibrary();

  if (!overdueCheckouts.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="text-emerald-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-3 text-sm font-medium text-gray-500">All clear!</p>
        <p className="mt-0.5 text-xs text-gray-400">No overdue checkouts</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {overdueCheckouts.map((c) => {
        const book = getBook(c.bookId);
        const member = getMember(c.memberId);
        const days = Math.floor((Date.now() - new Date(c.dueDate).getTime()) / 86_400_000);

        return (
          <div
            key={c.id}
            className="flex flex-col gap-3 rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900">{book?.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <span>{member?.name}</span>
                <Badge variant="red">{days}d overdue</Badge>
              </div>
            </div>
            <Button variant="ghost" className="shrink-0 self-end sm:self-auto" onClick={() => returnBook(c.id)}>
              Return
            </Button>
          </div>
        );
      })}
    </div>
  );
}
