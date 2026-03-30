"use client";

import { useRef, useEffect, useState } from "react";
import { Book } from "@/types";
import { useLibrary } from "@/hooks/useLibrary";
import { Button } from "./Button";

interface Props {
  book: Book;
  onClose: () => void;
}

export default function CheckoutModal({ book, onClose }: Props) {
  const { members, checkout } = useLibrary();
  const [memberId, setMemberId] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleConfirm = () => {
    if (!memberId) return;
    checkout(book.id, memberId);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 shadow-xl open:animate-[fade-in_150ms_ease-out]"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Check out book</h2>
        <p className="mt-1 text-sm text-gray-400">{book.title}</p>

        <label className="mt-6 block text-sm font-medium text-gray-700">
          Member
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
          >
            <option value="">Select a member...</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!memberId} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </dialog>
  );
}
