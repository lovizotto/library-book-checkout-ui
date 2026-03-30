import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CheckoutModal from "@/components/CheckoutModal";
import { renderWithLibrary, createMockDispatch } from "@/test-utils";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

const book = { id: "b3", title: "Design Patterns", author: "Gang of Four" };

describe("CheckoutModal", () => {
  it("renders the book title", () => {
    renderWithLibrary(<CheckoutModal book={book} onClose={vi.fn()} />);
    expect(screen.getByText("Design Patterns")).toBeInTheDocument();
  });

  it("renders all members in the select", () => {
    renderWithLibrary(<CheckoutModal book={book} onClose={vi.fn()} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("disables Confirm when no member selected", () => {
    renderWithLibrary(<CheckoutModal book={book} onClose={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("enables Confirm after selecting a member", () => {
    renderWithLibrary(<CheckoutModal book={book} onClose={vi.fn()} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "m1" } });
    expect(screen.getByRole("button", { name: "Confirm" })).not.toBeDisabled();
  });

  it("dispatches CHECKOUT_BOOK and calls onClose on confirm", () => {
    const dispatch = createMockDispatch();
    const onClose = vi.fn();
    renderWithLibrary(<CheckoutModal book={book} onClose={onClose} />, { dispatch });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "m1" } });
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHECKOUT_BOOK",
      payload: { bookId: "b3", memberId: "m1" },
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on cancel", () => {
    const onClose = vi.fn();
    renderWithLibrary(<CheckoutModal book={book} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
