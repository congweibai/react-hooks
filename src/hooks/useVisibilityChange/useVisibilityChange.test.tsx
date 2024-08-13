import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect } from "vitest";
import useVisibilityChange from "./useVisibilityChange";

describe("useVisibilityChange", () => {
  it("should return true when document is visible", () => {
    // act
    const { result } = renderHook(() => useVisibilityChange());

    // assert
    expect(result.current).toBe(true);
  });

  it("should return false when document becomes hidden", () => {
    // mock
    const { result } = renderHook(() => useVisibilityChange());

    act(() => {
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        value: "hidden",
      });
      // act
      document.dispatchEvent(new Event("visibilitychange"));
    });

    // assert
    expect(result.current).toBe(false);
  });

  it("should return true when document becomes visible again", () => {
    // mock
    const { result } = renderHook(() => useVisibilityChange());

    act(() => {
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        value: "hidden",
      });
      // act
      document.dispatchEvent(new Event("visibilitychange"));
    });

    act(() => {
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        value: "visible",
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    // assert
    expect(result.current).toBe(true);
  });
});
