import { describe, expect, it } from "vitest";
import useQueue from "./useQueue";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

describe("useQueue", () => {
  it("should accept an `initialValue` argument that will be used to initialize the `queue`", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    expect(result.current.queue).toEqual(initialValues);
  });

  it("should implement an `add` method that adds an element to the end of the `queue`", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    act(() => {
      result.current.add("4");
    });

    expect(result.current.last).toEqual("4");
    expect(result.current.queue[result.current.queue.length - 1]).toEqual("4");
    expect(result.current.queue).toEqual(["1", "2", "3", "4"]);
  });

  it("should implement a `remove` method that removes the first element from the `queue` and returns it", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    act(() => {
      result.current.remove();
    });

    expect(result.current.first).toEqual("2");
    expect(result.current.queue).toEqual(["2", "3"]);
  });

  it("should implement a `clear` method that sets the `queue` to an empty array", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    act(() => {
      result.current.clear();
    });

    expect(result.current.queue.length).toEqual(0);
    expect(result.current.queue).toEqual([]);
  });

  it("should implement a `first` property that returns the first element in the `queue`", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    expect(result.current.first).toEqual("1");
  });

  it("should implement a `last` property that returns the last element in the `queue`", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    expect(result.current.last).toEqual("3");
  });

  it("should implement a `size` property that returns the size of the `queue`", () => {
    const initialValues = ["1", "2", "3"];
    const { result } = renderHook(
      ({ initialValues }) => useQueue(initialValues),
      {
        initialProps: { initialValues },
      }
    );
    expect(result.current.size).toEqual(3);
    act(() => {
      result.current.clear();
    });
    expect(result.current.size).toEqual(0);
    act(() => {
      result.current.add("0");
    });
    expect(result.current.size).toEqual(1);
  });
});
