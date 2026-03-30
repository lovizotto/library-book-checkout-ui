"use client";

import { useLibrary } from "@/hooks/useLibrary";
import { useStateHash } from "@/hooks/useStateHash";
import { BookTable } from "./BookTable";

export function LibraryDashboard() {
  const { books, activeCheckouts, overdueCheckouts } = useLibrary();
  const hash = useStateHash();

  const stats = [
    { label: "Total books", value: books.length },
    { label: "Checked out", value: activeCheckouts.length },
    { label: "Overdue", value: overdueCheckouts.length, alert: overdueCheckouts.length > 0 },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
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

      <BookTable />
    </div>
  );
}
