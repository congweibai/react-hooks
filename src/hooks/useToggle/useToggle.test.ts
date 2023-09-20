import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import useToggle from "./useToggle";
import { act } from "@testing-library/react";

describe("useToggle", () => {
  it("should correctly establish its initial value", () => {
    const { result } = renderHook(() => useToggle(true));
    const [on] = result.current;
    expect(on).toBe(true);
  });

  it("should correctly establish its initial value, casting it to a boolean if it's not one", () => {
    const { result } = renderHook(() => useToggle("hello world"));
    const [on] = result.current;
    expect(on).toBe(true);
  });

  it("should toggle the state when its updater function is invoked without a value", () => {
    const { result } = renderHook(() => useToggle("hello world"));
    const [on, toggle] = result.current;
    expect(on).toBe(true);
    act(() => {
      toggle();
    });
    const [newValue] = result.current;

    expect(newValue).toBe(false);
  });

  it("should set the state to the provided value when its updater function is called with a boolean value", () => {
    const { result } = renderHook(() => useToggle("hello world"));
    const [on, toggle] = result.current;
    expect(on).toBe(true);
    act(() => {
      toggle(false);
    });
    const [newValue] = result.current;

    expect(newValue).toBe(false);

    act(() => {
      toggle(false);
    });

    const [newValue1] = result.current;

    expect(newValue1).toBe(false);
  });

  it("should not change the state when its updater function is called with the same boolean value", () => {
    const { result } = renderHook(() => useToggle(true));
    const [on, toggle] = result.current;
    expect(on).toBe(true);
    act(() => {
      toggle(true);
    });
    const [newValue] = result.current;

    expect(newValue).toBe(true);
  });

  it("should toggle the state when its updater function is called with a value that isn't a boolean", () => {
    const { result } = renderHook(() => useToggle(true));
    const [on, toggle] = result.current;
    expect(on).toBe(true);
    act(() => {
      toggle("true");
    });
    const [newValue] = result.current;

    expect(newValue).toBe(false);
  });
});
