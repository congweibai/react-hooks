import { useEffect, useState } from "react";

type BatteryState = {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
};

export default function useBattery() {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });
  useEffect(() => {
    if (!navigator?.getBattery) {
      setBatteryState((s) => ({
        ...s,
        loading: false,
        supported: false,
      }));

      return;
    }
    let battery: BatteryManager | null = null;

    const handleBatteryChange = () => {
      setBatteryState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    navigator.getBattery().then((b) => {
      battery = b;
      handleBatteryChange();
      b.addEventListener("levelchange", handleBatteryChange);
      b.addEventListener("chargingchange", handleBatteryChange);
      b.addEventListener("chargingtimechange", handleBatteryChange);
      b.addEventListener("dischargingtimechange", handleBatteryChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleBatteryChange);
        battery.removeEventListener("chargingchange", handleBatteryChange);
        battery.removeEventListener("chargingtimechange", handleBatteryChange);
        battery.removeEventListener(
          "dischargingtimechange",
          handleBatteryChange
        );
      }
    };
  }, []);

  return batteryState;
}
