import { useState } from "react";

export default function useDefault<T>(initialValue: T, defaultValue: T) {
  const [state, setState] = useState<T>(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
}
