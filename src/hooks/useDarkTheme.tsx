import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: boolean) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = JSON.parse(window.localStorage.getItem(key) || '');
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: boolean): void => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

const useDarkTheme = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme', false);

  useEffect(() => {
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add('dark') : bodyClass.remove('dark');
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkTheme;
