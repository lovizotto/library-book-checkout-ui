"use client";

import { useState } from "react";
import { Book } from "@/types";
import { useLibrary } from "@/hooks/useLibrary";
import { Badge } from "./Badge";
import { Button } from "./Button";

const MONOGRAM_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
  "bg-emerald-100 text-emerald-600",
  "bg-rose-100 text-rose-600",
];

function monogramColor(id: string) {
  const index = id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return MONOGRAM_COLORS[index % MONOGRAM_COLORS.length];
}

export function BookCard({ book }: { book: Book }) {
  const { isAvailable, getCheckoutForBook, getMember, members, checkout, returnBook } = useLibrary();
  const [memberId, setMemberId] = useState("");

  const available = isAvailable(book.id);
  const active = getCheckoutForBook(book.id);
  const borrower = active ? getMember(active.memberId) : null;
  const overdue = active ? new Date(active.dueDate) < new Date() : false;

  return (
    <div className="group rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3.5">
        {/* Monogram — deterministic color per book */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${monogramColor(book.id)}`}
        >
          {book.title[0]}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-gray-900">{book.title}</h3>
            <Badge variant={available ? "green" : overdue ? "red" : "yellow"}>
              {available ? "Available" : overdue ? "Overdue" : "Checked out"}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-gray-400">{book.author}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        {available ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
            >
              <option value="">Select member...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <Button
              disabled={!memberId}
              onClick={() => {
                checkout(book.id, memberId);
                setMemberId("");
              }}
            >
              Check out
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-sm text-gray-500">
              <span className="font-medium text-gray-700">{borrower?.name}</span>
              <span className="mx-1.5 text-gray-300">&middot;</span>
              <span>due {new Date(active!.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </p>
            <Button variant="ghost" onClick={() => returnBook(active!.id)}>
              Return
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
