"use client";

import { useState } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import { useStateHash } from "@/hooks/useStateHash";
import { BookCard } from "./BookCard";
import { OverdueList } from "./OverdueList";

type Tab = "books" | "overdue";

const TABS: { key: Tab; label: string }[] = [
  { key: "books", label: "Books" },
  { key: "overdue", label: "Overdue" },
];

export function LibraryDashboard() {
  const [tab, setTab] = useState<Tab>("books");
  const { books, activeCheckouts, overdueCheckouts } = useLibrary();
  const hash = useStateHash();

  const stats = [
    { label: "Total books", value: books.length },
    { label: "Checked out", value: activeCheckouts.length },
    { label: "Overdue", value: overdueCheckouts.length, alert: overdueCheckouts.length > 0 },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <header className="mb-8 sm:mb-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Library
            </h1>
            <p className="mt-1 text-sm text-gray-400">Book checkout management</p>
          </div>
          <code className="hidden text-xs text-gray-300 sm:block">#{hash}</code>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white/80 px-4 py-3 text-center shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm"
            >
              <p className={`text-2xl font-bold tabular-nums ${s.alert ? "text-red-600" : "text-gray-900"}`}>
                {s.value}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <nav className="mb-8 flex gap-1 rounded-xl bg-gray-100/80 p-1 backdrop-blur-sm">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:flex-none ${
              tab === key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
            {key === "overdue" && overdueCheckouts.length > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                {overdueCheckouts.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      {tab === "books" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
      {tab === "overdue" && <OverdueList />}
    </div>
  );
}
