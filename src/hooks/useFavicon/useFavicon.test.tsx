import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import useFavicon from "./useFavicon";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

let headElement: HTMLHeadElement | null = null;

beforeEach(() => {
  headElement = document.createElement("head");
  document.head.appendChild(headElement);
});

afterEach(() => {
  if (headElement) {
    unmountComponentAtNode(headElement);
    document.head.removeChild(headElement);
    headElement = null;
  }
});

describe("useFavicon", () => {
  it("should update the document's favicon with the provided URL", () => {
    const faviconUrl = "https://favicon.ico/";

    renderHook(() => useFavicon(faviconUrl));

    const linkElement = document.querySelector("link[rel='shortcut icon']");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.href).toBe(faviconUrl);
  });

  it("should update the document's favicon when the URL changes", () => {
    const { rerender } = renderHook(({ url }) => useFavicon(url), {
      initialProps: { url: "https://favicon1.ico/" },
    });

    let linkElement = document.querySelector("link[rel='shortcut icon']");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.href).toBe("https://favicon1.ico/");

    act(() => {
      rerender({ url: "https://favicon2.ico/" });
    });

    linkElement = document.querySelector("link[rel='shortcut icon']");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.href).toBe("https://favicon2.ico/");
  });
});
