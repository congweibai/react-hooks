import { useEffect, useRef, useCallback } from "react";

export default function useTimeout(cb: () => void, ms: number) {
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const clearCurrentTimeOut = useCallback(() => {
    if (timeId.current) clearTimeout(timeId.current);
  }, []);

  useEffect(() => {
    timeId.current = setTimeout(cb, ms);
    return clearCurrentTimeOut;
  }, [ms, cb]);
  return clearCurrentTimeOut;
}
