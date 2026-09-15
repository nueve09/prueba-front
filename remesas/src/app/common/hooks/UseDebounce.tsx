import React from "react";

export default function useDebounce<TValue>(value: TValue, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<TValue>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
