import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { LibraryContext } from "@/context/LibraryContext";
import { LibraryState, LibraryAction } from "@/types";
import { vi } from "vitest";

export const testState: LibraryState = {
  books: [
    { id: "b1", title: "Clean Code", author: "Robert C. Martin" },
    { id: "b2", title: "Refactoring", author: "Martin Fowler" },
    { id: "b3", title: "Design Patterns", author: "Gang of Four" },
  ],
  members: [
    { id: "m1", name: "Alice Johnson" },
    { id: "m2", name: "Bob Smith" },
  ],
  checkouts: [
    { id: "c1", bookId: "b1", memberId: "m1", checkedOutAt: "2020-01-01T00:00:00.000Z", dueDate: "2020-01-15T00:00:00.000Z", returnedAt: null },
    { id: "c2", bookId: "b2", memberId: "m2", checkedOutAt: "2099-01-01T00:00:00.000Z", dueDate: "2099-12-31T00:00:00.000Z", returnedAt: null },
  ],
};

export function createMockDispatch() {
  return vi.fn<(action: LibraryAction) => void>();
}

export function renderWithLibrary(
  ui: ReactElement,
  { state = testState, dispatch = createMockDispatch(), ...options }: RenderOptions & { state?: LibraryState; dispatch?: React.Dispatch<LibraryAction> } = {}
) {
  const mockDispatch = dispatch;
  return {
    ...render(
      <LibraryContext.Provider value={{ state, dispatch: mockDispatch }}>
        {ui}
      </LibraryContext.Provider>,
      options
    ),
    dispatch: mockDispatch,
  };
}
