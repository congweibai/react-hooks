import { describe, expect, it } from "vitest";
import useHover from "./useHover";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";

function TestComponent() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef} data-testid="test-el">
      {isHovered ? "Hovered" : "Not Hovered"}
    </div>
  );
}
describe("useHover", () => {
  it("should return true when hovered and return false when not hovered", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const hoverElement = screen.getByTestId("test-el");

    expect(hoverElement).toHaveTextContent("Not Hovered");

    act(() => {
      user.hover(hoverElement);
    });

    await waitFor(() => {
      expect(hoverElement).toHaveTextContent("Hovered");
    });

    act(() => {
      user.unhover(hoverElement);
    });

    await waitFor(() => {
      expect(hoverElement).toHaveTextContent("Not Hovered");
    });
  });
});
