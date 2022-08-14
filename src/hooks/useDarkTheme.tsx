import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkTheme = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme', false);

  useEffect(() => {
    const bodyClass = window.document.body.classList;
    enabled ? bodyClass.add('dark') : bodyClass.remove('dark');
  
    window.document.documentElement.style.colorScheme = (enabled) ? 'dark' : 'light';
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkTheme;
