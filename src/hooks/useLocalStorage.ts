// hooks/useLocalStorage.ts

import { useState } from "react";

type SetValue<T> = (value: T) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // При загрузке компонента пытаемся получить значение из localStorage
  const storedValue = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState<T>(initial);

  // При изменении значения, обновляем и localStorage
  const setStoredValue: SetValue<T> = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
