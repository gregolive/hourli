import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(key) || '';
    return (value) ? JSON.parse(value) : initialValue;
  });

  const setValue = (value: boolean): void => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
