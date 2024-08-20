import { renderHook, act } from "@testing-library/react-hooks";
import useDebounce from "./useDebounce";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";

describe("useDebounce", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.clearAllTimers();
  });

  it("should return the initial value immediately", () => {
    // act
    const { result } = renderHook(() => useDebounce("initial", 500));

    // assert
    expect(result.current).toBe("initial");
  });

  it("should debounce the value after the specified delay", async () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // act
    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should reset the debounce timer if the value changes before the delay", () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // assert
    expect(result.current).toBe("initial");

    rerender({ value: "updated1", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("initial");

    rerender({ value: "updated2", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated2");
  });

  it("should handle delay changes correctly", () => {
    // act
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // assert
    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });
});
