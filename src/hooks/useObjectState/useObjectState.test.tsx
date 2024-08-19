import { renderHook, act } from "@testing-library/react-hooks";
import useObjectState from "./useObjectState";
import { describe, it, expect } from "vitest";

describe("useObjectState", () => {
  it("should initialize with the provided initial value", () => {
    // mock
    const initialValue = { key1: "value1", key2: "value2" };

    // act
    const { result } = renderHook(() => useObjectState(initialValue));

    // assert
    const [state] = result.current;
    expect(state).toEqual(initialValue);
  });

  it("should update state by merging new values", () => {
    // mock
    const initialValue = { key1: "value1", key2: "value2" };
    const { result } = renderHook(() => useObjectState(initialValue));

    // act
    const [, setObjectState] = result.current;

    act(() => {
      setObjectState({ key2: "newValue2", key3: "value3" });
    });

    // assert
    const [state] = result.current;
    expect(state).toEqual({
      key1: "value1",
      key2: "newValue2",
      key3: "value3",
    });
  });

  it("should update state using a function", () => {
    // mock
    const initialValue = { key1: "value1", count: 1 };
    const { result } = renderHook(() => useObjectState(initialValue));

    // act
    const [, setObjectState] = result.current;

    act(() => {
      setObjectState((prevState) => ({
        count: prevState.count + 1,
      }));
    });

    // assert
    const [state] = result.current;
    expect(state).toEqual({
      key1: "value1",
      count: 2,
    });
  });

  it("should not update state when given a non-object value", () => {
    // mock
    const initialValue = { key1: "value1" };
    const { result } = renderHook(() => useObjectState(initialValue));

    // act
    const [, setObjectState] = result.current;

    act(() => {
      setObjectState(null);
    });

    // assert
    const [state] = result.current;
    expect(state).toEqual(initialValue);
  });

  it("should handle updates when initial value is not a plain object", () => {
    // act
    const { result } = renderHook(() => useObjectState("invalid" as any));

    // assert
    const [state] = result.current;
    expect(state).toEqual({});
  });
});
