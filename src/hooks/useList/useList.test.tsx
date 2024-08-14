import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect } from "vitest";
import useList from "./useList";

describe("useList", () => {
  it("should initialize with default list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("should set a new list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { set } = result.current[1];
      set([4, 5, 6]);
    });

    expect(result.current[0]).toEqual([4, 5, 6]);
  });

  it("should push a new item to the list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { push } = result.current[1];
      push(4);
    });

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it("should remove an item at a specific index", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { removeAt } = result.current[1];
      removeAt(1);
    });

    expect(result.current[0]).toEqual([1, 3]);
  });

  it("should insert an item at a specific index", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { insertAt } = result.current[1];
      insertAt(1, 4);
    });

    expect(result.current[0]).toEqual([1, 4, 2, 3]);
  });

  it("should update an item at a specific index", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { updateAt } = result.current[1];
      updateAt(1, 5);
    });

    expect(result.current[0]).toEqual([1, 5, 3]);
  });

  it("should clear the list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      const { clear } = result.current[1];
      clear();
    });

    expect(result.current[0]).toEqual([]);
  });
});
