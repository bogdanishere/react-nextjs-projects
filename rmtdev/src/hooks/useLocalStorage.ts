import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const initialValueFromLocalStorage = JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue)
  );

  const [value, setValue] = useState<number[]>(
    () => initialValueFromLocalStorage
  );
  // initial state from local storage, only on first render

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};
