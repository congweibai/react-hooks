import { useCallback, useState } from "react";

export default function useToggle(initialValue: unknown) {
  const [on, setOn] = useState(() => {
    if (typeof initialValue === "boolean") {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const handleToggle = useCallback((value?: unknown) => {
    if (typeof value === "boolean") {
      return setOn(value);
    }

    return setOn((prev) => !prev);
  }, []);

  return [on, handleToggle];
}
