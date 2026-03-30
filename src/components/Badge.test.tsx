import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge variant="green">Available</Badge>);
    expect(screen.getByText("Available")).toBeDefined();
  });

  it("applies green variant classes", () => {
    render(<Badge variant="green">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("bg-emerald-50");
  });

  it("applies red variant classes", () => {
    render(<Badge variant="red">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("bg-red-50");
  });

  it("applies yellow variant classes", () => {
    render(<Badge variant="yellow">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("bg-amber-50");
  });
});
