import { ReactElement } from 'react';
import useDarkTheme from '../../hooks/useDarkTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitch = (): ReactElement => {
  const [darkTheme, setDarkTheme] = useDarkTheme();
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  return (
    <button onClick={toggleTheme}>
      {darkTheme ? (
        <FaMoon size='30' className='top-navigation-icon' />
      ) : (
        <FaSun size='30' className='top-navigation-icon' />
      )}
    </button>
  );
};

const Header = (): ReactElement => {
  return (
    <header className='bg-slate-300 dark:bg-slate-800'>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
