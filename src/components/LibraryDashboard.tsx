"use client";

import { BookTable } from "./BookTable";

export function LibraryDashboard() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Library
        </h1>
        <p className="mt-1 text-sm text-gray-400">Book checkout management</p>
      </header>
      <BookTable />
    </div>
  );
}
