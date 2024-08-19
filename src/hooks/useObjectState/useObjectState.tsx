import { useCallback, useState } from "react";

const isPlainObject = (value: unknown) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue: Object) {
  const [value, setValue] = useState<Object>(
    isPlainObject(initialValue) ? initialValue : {}
  );

  const setObjectState = useCallback((value: Object) => {
    if (typeof value === "function") {
      setValue((current) => {
        const newValue = value(current);

        if (isPlainObject(newValue)) {
          return {
            ...current,
            ...newValue,
          };
        }
      });
    }
    if (isPlainObject(value)) {
      setValue((current) => {
        return {
          ...current,
          ...value,
        };
      });
    }
  }, []);

  return [value, setObjectState];
}
