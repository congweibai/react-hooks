import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import usePrevious from "./usePrevious";
import { act, render } from "@testing-library/react";

describe("usePrevious", () => {
  it("should return null on the first render", () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeNull();
  });

  it("should return the previous value when the current value changes", () => {
    let value = 1;
    let previousValue = null;

    function TestComponent() {
      const prev = usePrevious(value);

      // Update the value after the first render
      if (value === 1) {
        value = 2;
      } else if (value === 2) {
        previousValue = prev;
      }

      return null;
    }

    const { rerender } = render(<TestComponent />);

    // Re-render the component to trigger the update
    act(() => {
      rerender(<TestComponent />);
    });

    expect(previousValue).toBe(1);
  });
});
