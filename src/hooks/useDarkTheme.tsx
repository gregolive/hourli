import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkTheme = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme', false);

  useEffect(() => {
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add('dark') : bodyClass.remove('dark');
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkTheme;
