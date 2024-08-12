import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import useTimeout from "./useTimeout";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

// Test Component using the useTimeout hook
function TestComponent({
  onTimeout,
  delay,
}: {
  onTimeout: () => void;
  delay: number;
}) {
  useTimeout(onTimeout, delay);
  return null;
}

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call the callback after the specified timeout", () => {
    // mock
    const callback = vi.fn();
    const delay = 1000;

    // act
    render(<TestComponent onTimeout={callback} delay={delay} />);

    act(() => {
      vi.advanceTimersByTime(delay);
    });

    // assert
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear timeout on unmount", () => {
    // mock
    const callback = vi.fn();
    const delay = 1000;

    // act
    const { unmount } = render(
      <TestComponent onTimeout={callback} delay={delay} />
    );

    act(() => {
      vi.advanceTimersByTime(delay / 2);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(delay / 2);
    });

    // assert
    expect(callback).not.toHaveBeenCalled();
  });

  it("should clear the timeout when delay changes", () => {
    // mock
    const callback = vi.fn();
    const initialDelay = 1000;
    const newDelay = 2000;

    // act
    const { rerender } = render(
      <TestComponent onTimeout={callback} delay={initialDelay} />
    );

    act(() => {
      vi.advanceTimersByTime(initialDelay / 2);
    });

    rerender(<TestComponent onTimeout={callback} delay={newDelay} />);

    act(() => {
      vi.advanceTimersByTime(newDelay / 2);
    });

    // assert
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(newDelay / 2);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
