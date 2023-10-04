import { afterEach, beforeEach, describe, expect, it } from "vitest";
import useLockBodyScroll from "./useLockBodyScroll";
import { render } from "@testing-library/react";

function TestComponent() {
  useLockBodyScroll();
  return null;
}

describe("useLockBodyScroll", () => {
  let originalOverflow = "";

  beforeEach(() => {
    // Store the original overflow style
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    // Restore the original overflow style after all tests are finished
    document.body.style.overflow = originalOverflow;
  });

  it("should lock body scroll when mounted and unlock when unmounted", () => {
    const { unmount } = render(<TestComponent />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
