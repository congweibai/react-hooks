import { useCallback, useState } from "react";

export default function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = useState<T[]>(initialValue);

  const add = useCallback((element: T) => {
    setQueue((q) => [...q, element]);
  }, []);

  const remove = useCallback(() => {
    let removedElement;

    setQueue(([first, ...q]) => {
      removedElement = first;
      return q;
    });

    return removedElement;
  }, []);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  };
}
