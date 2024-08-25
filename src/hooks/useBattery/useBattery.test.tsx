import { renderHook, act } from "@testing-library/react-hooks";
import useBattery from "./useBattery"; // Adjust the path as needed
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";

type MockBattery = {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener: Mock;
  removeEventListener: Mock;
};

describe("useBattery", () => {
  let mockBattery: MockBattery;
  let getBatteryMock: Mock;

  beforeEach(() => {
    // mock
    mockBattery = {
      level: 0.5,
      charging: true,
      chargingTime: 100,
      dischargingTime: 200,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    getBatteryMock = vi.fn().mockResolvedValue(mockBattery);
    Object.defineProperty(navigator, "getBattery", {
      value: getBatteryMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with loading state", () => {
    // act
    const { result } = renderHook(() => useBattery());

    // assert
    expect(result.current.loading).toBe(true);
    expect(result.current.supported).toBe(true);
  });

  it("should update battery state when getBattery is resolved", async () => {
    // act
    const { result, waitForNextUpdate } = renderHook(() => useBattery());

    await waitForNextUpdate();

    // assert
    expect(result.current.loading).toBe(false);
    expect(result.current.supported).toBe(true);
    expect(result.current.level).toBe(0.5);
    expect(result.current.charging).toBe(true);
    expect(result.current.chargingTime).toBe(100);
    expect(result.current.dischargingTime).toBe(200);
  });

  it("should update state when battery properties change", async () => {
    // act
    const { result, waitForNextUpdate } = renderHook(() => useBattery());

    await waitForNextUpdate();

    act(() => {
      mockBattery.level = 0.7;
      mockBattery.addEventListener.mock.calls[0][1](); // Trigger the event listener
    });

    // assert
    expect(result.current.level).toBe(0.7);
  });
});
