import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createElement, ReactNode } from "react";
import { LibraryContext } from "@/context/LibraryContext";
import { useLibrary } from "@/hooks/useLibrary";
import { testState, createMockDispatch } from "@/test-utils";

function createWrapper(dispatch = createMockDispatch()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(LibraryContext.Provider, { value: { state: testState, dispatch } }, children);
  };
}

describe("useLibrary", () => {
  it("returns only active (non-returned) checkouts", () => {
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper() });
    expect(result.current.activeCheckouts).toHaveLength(2);
  });

  it("returns only overdue checkouts", () => {
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper() });
    expect(result.current.overdueCheckouts).toHaveLength(1);
    expect(result.current.overdueCheckouts[0].id).toBe("c1");
  });

  it("marks checked-out books as unavailable", () => {
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper() });
    expect(result.current.isAvailable("b1")).toBe(false);
  });

  it("marks books without active checkouts as available", () => {
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper() });
    expect(result.current.isAvailable("b3")).toBe(true);
  });

  it("dispatches CHECKOUT_BOOK action", () => {
    const dispatch = createMockDispatch();
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper(dispatch) });
    result.current.checkout("b3", "m1");
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHECKOUT_BOOK",
      payload: { bookId: "b3", memberId: "m1" },
    });
  });

  it("dispatches RETURN_BOOK action", () => {
    const dispatch = createMockDispatch();
    const { result } = renderHook(() => useLibrary(), { wrapper: createWrapper(dispatch) });
    result.current.returnBook("c1");
    expect(dispatch).toHaveBeenCalledWith({
      type: "RETURN_BOOK",
      payload: { checkoutId: "c1" },
    });
  });
});
