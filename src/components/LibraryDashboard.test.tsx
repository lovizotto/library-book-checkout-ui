import { screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LibraryDashboard } from "./LibraryDashboard";
import { renderWithLibrary } from "@/test-utils";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("LibraryDashboard", () => {
  it("renders the Library heading", () => {
    renderWithLibrary(<LibraryDashboard />);
    expect(screen.getByText("Library")).toBeDefined();
  });

  it("renders the subtitle", () => {
    renderWithLibrary(<LibraryDashboard />);
    expect(screen.getByText("Book checkout management")).toBeDefined();
  });

  it("renders book content", () => {
    renderWithLibrary(<LibraryDashboard />);
    expect(screen.getAllByText("Clean Code").length).toBeGreaterThanOrEqual(1);
  });
});
