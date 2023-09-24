import { useState } from "react";

interface UserCounterOptions {
  min?: number;
  max?: number;
}

export default function useCounter(
  startingValue = 0,
  options: UserCounterOptions = {}
) {
  const { min, max } = options;

  if (min && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (max && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = useState(startingValue);

  const increment = () => {
    setCount((prevCount) => (prevCount + 1 <= max ? prevCount + 1 : prevCount));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount - 1 >= min ? prevCount - 1 : prevCount));
  };

  const set = (nextCount: number) => {
    if (max && nextCount > max) {
      return;
    }

    if (min && nextCount < min) {
      return;
    }

    if (nextCount === count) {
      return;
    }

    setCount(nextCount);
  };

  const reset = () => {
    setCount(count);
  };

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
