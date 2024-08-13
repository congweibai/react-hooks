import { renderHook, act } from "@testing-library/react-hooks";
import useWindowSize from "./useWindowSize";
import { describe, expect, it } from "vitest";

describe("useWindowSize", () => {
  it("should return the initial window size", () => {
    // mock
    window.innerWidth = 1024;
    window.innerHeight = 768;

    // act
    const { result } = renderHook(() => useWindowSize());

    // assert
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("should update the window size on resize", () => {
    // mock
    const { result } = renderHook(() => useWindowSize());

    // act
    act(() => {
      window.innerWidth = 1280;
      window.innerHeight = 720;
      window.dispatchEvent(new Event("resize"));
    });

    // assert
    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(720);
  });
});
