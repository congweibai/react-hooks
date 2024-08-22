import { renderHook, act } from "@testing-library/react-hooks";
import useHistoryState from "./useHistoryState";
import { describe, expect, it } from "vitest";

describe("useHistoryState", () => {
  it("should initialize with the initial present state", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    expect(result.current.state).toBe("initial");
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it("should set a new present state and track history", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    act(() => {
      result.current.set("newState1");
    });

    expect(result.current.state).toBe("newState1");
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it("should undo the last state change", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    act(() => {
      result.current.set("newState1");
    });

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe("initial");
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
  });

  it("should redo the undone state change", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    act(() => {
      result.current.set("newState1");
      result.current.undo();
      result.current.redo();
    });

    expect(result.current.state).toBe("newState1");
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it("should clear history and set to the initial present state", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    act(() => {
      result.current.set("newState1");
      result.current.clear();
    });

    expect(result.current.state).toBe("initial");
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it("should not set a new state if the present state is the same", () => {
    const { result } = renderHook(() => useHistoryState("initial"));

    act(() => {
      result.current.set("initial");
    });

    expect(result.current.state).toBe("initial");
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });
});
