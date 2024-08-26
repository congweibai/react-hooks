import { renderHook, act } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useThrottle from "./useThrottle";

describe("useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should update the throttled value immediately on first render", () => {
    // act
    const { result } = renderHook(() => useThrottle("initial", 500));

    // assert
    expect(result.current).toBe("initial");
  });

  it("should throttle updates based on the interval", () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      {
        initialProps: { value: "initial", interval: 500 },
      }
    );

    // assert
    expect(result.current).toBe("initial");

    // act
    rerender({ value: "updatedValue", interval: 500 });

    // assert
    expect(result.current).toBe("initial");

    // mock
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // assert
    expect(result.current).toBe("initial");

    // mock
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // assert
    expect(result.current).toBe("updatedValue");
  });

  it("should update the throttled value after the interval", () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      {
        initialProps: { value: "initial", interval: 500 },
      }
    );

    // assert
    expect(result.current).toBe("initial");

    // mock
    rerender({ value: "newValue", interval: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // assert
    expect(result.current).toBe("newValue");
  });

  it("should not update the throttled value until the interval has passed", () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      {
        initialProps: { value: "initial", interval: 500 },
      }
    );
    rerender({ value: "updatedValue", interval: 500 });

    // assert
    expect(result.current).toBe("initial");

    // mock
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // assert
    expect(result.current).toBe("initial");

    // mock
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // assert
    expect(result.current).toBe("updatedValue");
  });
});
