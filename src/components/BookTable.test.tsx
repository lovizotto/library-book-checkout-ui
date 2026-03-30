import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BookTable } from "./BookTable";
import { renderWithLibrary, createMockDispatch } from "@/test-utils";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("BookTable", () => {
  it("renders all book titles", () => {
    renderWithLibrary(<BookTable />);
    expect(screen.getAllByText("Clean Code").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Refactoring").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Design Patterns").length).toBeGreaterThanOrEqual(1);
  });

  it("shows correct status badges", () => {
    renderWithLibrary(<BookTable />);
    expect(screen.getAllByText("Overdue").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Checked out").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Available").length).toBeGreaterThanOrEqual(1);
  });

  it("shows Check out button for available books", () => {
    renderWithLibrary(<BookTable />);
    expect(screen.getAllByText("Check out").length).toBeGreaterThanOrEqual(1);
  });

  it("shows Return button for checked-out books", () => {
    renderWithLibrary(<BookTable />);
    expect(screen.getAllByText("Return").length).toBeGreaterThanOrEqual(1);
  });

  it("filters to overdue books when Overdue tab is clicked", () => {
    renderWithLibrary(<BookTable />);
    const buttons = screen.getAllByRole("button");
    const overdueTab = buttons.find((b) => b.textContent?.includes("Overdue"));
    fireEvent.click(overdueTab!);
    expect(screen.getAllByText("Clean Code").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("Design Patterns")).toBeNull();
  });

  it("dispatches RETURN_BOOK when Return is clicked", () => {
    const dispatch = createMockDispatch();
    renderWithLibrary(<BookTable />, { dispatch });
    const returnButtons = screen.getAllByRole("button", { name: "Return" });
    fireEvent.click(returnButtons[0]);
    expect(dispatch).toHaveBeenCalledWith({
      type: "RETURN_BOOK",
      payload: { checkoutId: "c1" },
    });
  });
});
