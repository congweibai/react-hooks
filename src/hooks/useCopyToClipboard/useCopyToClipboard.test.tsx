import { afterEach, describe, expect, it, test, vitest } from "vitest";
import useCopyToClipboard from "./useCopyToClipboard";
import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

document.execCommand = vitest.fn();
describe("useCopyToClipboard", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });
  it("should return an array with the first item being the value that was copied and the second being a function to copy a value to the user's clipboard", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current[0]).toBeNull();
    expect(typeof result.current[1]).toBe("function");
  });

  test("The first item in the array that useCopyToClipboard returns should be the value that was copied to the clipboard", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    act(() => {
      result.current[1]("testValue");
    });

    await waitFor(async () => expect(result.current[0]).toBe("testValue"));
  });
});
