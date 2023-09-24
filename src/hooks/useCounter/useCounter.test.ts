import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import useCounter from "./useCounter";
import { act } from "@testing-library/react";

describe("useCounter", () => {
  it("should accept a starting value and default it to 0 if no value is provided", () => {
    const { result } = renderHook(() => useCounter());
    const [currentValue] = result.current;
    expect(currentValue).toBe(0);
  });

  it("should also accept an object with min and max values and throw an error if the starting value is outside of that range", () => {
    const { result } = renderHook(() => useCounter(100, { min: 0, max: 10 }));
    expect(result.error?.message).toEqual(
      `Your starting value of 100 is greater than your max of 10.`
    );
  });

  it("should also accept an object with min and max values and throw an error if the starting value is outside of that range", () => {
    const { result } = renderHook(() => useCounter(1, { min: 10, max: 10 }));
    expect(result.error?.message).toEqual(
      `Your starting value of 1 is less than your min of 10.`
    );
  });

  it("should return an array with the first item being the current value of count and the second being an object with increment, decrement, set, and reset methods", () => {
    const { result } = renderHook(() => useCounter(11, { min: 10, max: 100 }));
    const [curr, { increment, decrement, set, reset }] = result.current;
    expect(curr).toBeTruthy();
    expect(increment).toBeTruthy();
    expect(decrement).toBeTruthy();
    expect(set).toBeTruthy();
    expect(reset).toBeTruthy();
  });

  it("should increment the count value by 1 when increment is called (unless the max value is reached)", () => {
    const { result } = renderHook(() => useCounter(11, { min: 10, max: 12 }));
    const [curr, { increment }] = result.current;
    act(() => {
      increment();
    });
    const [newValue] = result.current;
    expect(newValue).toBe(12);

    act(() => {
      increment();
    });
    const [limitReached] = result.current;
    expect(limitReached).toBe(12);
  });

  it("should decrement the count value by 1 when decrement is called (unless the min value is reached)", () => {
    const { result } = renderHook(() => useCounter(11, { min: 10, max: 100 }));
    const [curr, { decrement }] = result.current;
    act(() => {
      decrement();
    });
    const [newValue] = result.current;
    expect(newValue).toBe(10);

    act(() => {
      decrement();
    });
    const [limitReached] = result.current;
    expect(limitReached).toBe(10);
  });

  it("should set the count value to the provided value when set is called (unless the min or max value is reached)", () => {
    const { result } = renderHook(() => useCounter(11, { min: 10, max: 100 }));
    const [curr, { set }] = result.current;
    act(() => {
      set(20);
    });
    const [newValue] = result.current;
    expect(newValue).toBe(20);

    act(() => {
      set(200);
    });
    const [limitReached] = result.current;
    expect(limitReached).toBe(20);
  });

  it("should reset the count value to the starting value when reset is called (unless the count value is already the starting value)", () => {
    const { result } = renderHook(() => useCounter(11, { min: 10, max: 100 }));
    const [curr, { increment, reset }] = result.current;
    act(() => {
      increment();
      reset();
    });
    const [newValue] = result.current;
    () => expect(newValue).toBe(12);
    act(() => {
      reset();
    });
    const [limitReached] = result.current;
    expect(limitReached).toBe(11);
  });
});
