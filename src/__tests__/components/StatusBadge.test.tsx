import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "@/components/StatusBadge";

describe("StatusBadge", () => {
  it("renders Available with green variant", () => {
    render(<StatusBadge available={true} overdue={false} />);
    const badge = screen.getByText("Available");
    expect(badge.className).toContain("bg-emerald-50");
  });

  it("renders Overdue with red variant", () => {
    render(<StatusBadge available={false} overdue={true} />);
    const badge = screen.getByText("Overdue");
    expect(badge.className).toContain("bg-red-50");
  });

  it("renders Checked out with yellow variant", () => {
    render(<StatusBadge available={false} overdue={false} />);
    const badge = screen.getByText("Checked out");
    expect(badge.className).toContain("bg-amber-50");
  });
});
