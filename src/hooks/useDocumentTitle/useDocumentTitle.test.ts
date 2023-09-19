import { renderHook } from "@testing-library/react-hooks";
import useDocumentTitle from "./useDocumentTitle";

describe("useDocumentTitle", () => {
  it("should set document title correctly", () => {
    const title = "Test Title";
    const { unmount } = renderHook(() => useDocumentTitle(title));

    expect(document.title).toBe(title);

    // Clean up to reset the document title
    unmount();
  });

  it("should update document title when title prop changes", () => {
    const initialTitle = "Initial Title";
    const updatedTitle = "Updated Title";

    const { rerender, unmount } = renderHook(
      ({ title }) => useDocumentTitle(title),
      {
        initialProps: { title: initialTitle },
      }
    );

    expect(document.title).toBe(initialTitle);

    rerender({ title: updatedTitle });

    expect(document.title).toBe(updatedTitle);

    // Clean up to reset the document title
    unmount();
  });
});
