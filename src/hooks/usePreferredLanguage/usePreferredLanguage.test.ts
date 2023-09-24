import { renderHook } from "@testing-library/react-hooks";
import { afterEach, describe, expect, it, vitest } from "vitest";
import usePreferredLanguage from "./usePreferredLanguage";
import { act } from "@testing-library/react";

// Mock the window.navigator.language property
const mockNavigatorLanguage = vitest.spyOn(navigator, "language", "get");
mockNavigatorLanguage.mockReturnValue("en-US");

describe("usePreferredLanguage", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should return the user's preferred language as a string", () => {
    const { result } = renderHook(() => usePreferredLanguage());
    expect(typeof result.current).toBe("string");
  });

  it("should listen for changes to the user's preferred language and update the return value", () => {
    const { result } = renderHook(() => usePreferredLanguage());

    act(() => {
      mockNavigatorLanguage.mockReturnValue("fr-FR");
      window.dispatchEvent(new Event("languagechange"));
    });

    expect(result.current).toBe("fr-FR"); // Ensure that the return value is updated
  });

  it("should unsubscribe from the languagechange event when the component is removed from the DOM", () => {
    // Create a spy on window.removeEventListener
    const removeEventListenerSpy = vitest.spyOn(window, "removeEventListener");

    const { result, unmount } = renderHook(() => usePreferredLanguage());

    expect(mockNavigatorLanguage).toHaveBeenCalled();

    act(() => {
      // Simulate a change in the preferred language
      mockNavigatorLanguage.mockReturnValue("fr-FR");
      window.dispatchEvent(new Event("languagechange"));
    });

    expect(result.current).toBe("fr-FR"); // Ensure that the return value is updated

    act(() => {
      unmount(); // Unmount the component
    });

    // Expect that removeEventListener was called with the expected arguments
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "languagechange",
      expect.any(Function)
    );

    // Restore the original function after the test
    removeEventListenerSpy.mockRestore();
  });

  it("should throw an error if used on the server", () => {
    // Save the original window object
    const originalWindow = global.window;

    // Temporarily set window to undefined to simulate server-side rendering
    global.window = undefined;

    // Assert that using the hook on the server throws an error
    expect(() => renderHook(() => usePreferredLanguage())).toThrow();

    // Restore the original window object
    global.window = originalWindow;
  });
});
