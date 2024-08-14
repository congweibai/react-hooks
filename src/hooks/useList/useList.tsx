import { useCallback, useState } from "react";

export default function useList(defaultList: unknown[] = []) {
  const [list, setList] = useState(defaultList);

  const set = useCallback((newSet: unknown[]) => setList(newSet), []);

  const push = useCallback(
    (item: unknown) => setList((list) => [...list, item]),
    []
  );

  const removeAt = useCallback(
    (index: number) =>
      setList((list) => {
        const removedList = list.slice();
        removedList.splice(index, 1);
        return removedList;
      }),
    []
  );

  const insertAt = useCallback((index: number, item: unknown) => {
    setList((list) => {
      const firstPart = list.slice().splice(0, index);
      const secondPart = list.slice().splice(index);
      return [...firstPart, item, ...secondPart];
    });
  }, []);

  const updateAt = useCallback((index: number, item: unknown) => {
    setList((list) => {
      const updateList = list.slice();
      updateList[index] = item;
      return updateList;
    });
  }, []);

  const clear = useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
