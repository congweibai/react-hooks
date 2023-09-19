import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDefault from "./useDefault"; // Import your useDefault hook
describe("TestComponent", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(
      ({ initialValue, defaultValue }) =>
        useDefault(initialValue, defaultValue),
      {
        initialProps: { initialValue: null, defaultValue: 0 },
      }
    );

    const [value] = result.current;

    expect(value).toBe(0);
  });

  it("should initialize with the initial value when state is not null", () => {
    const { result } = renderHook(() => useDefault(42, 0));

    const [value] = result.current;

    expect(value).toBe(42);
  });

  it("should update the value when setState is called", () => {
    const { result } = renderHook(() => useDefault(42, 0));

    act(() => {
      const [, setState] = result.current;
      setState(100);
    });

    const [value] = result.current;

    expect(value).toBe(100);
  });
});
