import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders with primary variant by default", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button").className).toContain("bg-gray-900");
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Click</Button>);
    expect(screen.getByRole("button").className).toContain("text-gray-600");
  });

  it("fires onClick handler", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders disabled state", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("merges custom className", () => {
    render(<Button className="w-full">Click</Button>);
    expect(screen.getByRole("button").className).toContain("w-full");
  });
});
