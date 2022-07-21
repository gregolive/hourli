import { ReactElement } from 'react';
import useDarkTheme from '../../hooks/useDarkTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const HeaderTitle = (): ReactElement => {
  return (
    <h1 className='text-4xl font-medium'>
      <span className='text-teal-500'>hour</span>
      <span className='text-neutral-900 dark:text-neutral-50'>.li</span>
    </h1>
  );
}

const ThemeSwitch = (): ReactElement => {
  const [darkTheme, setDarkTheme] = useDarkTheme();
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  return (
    <button onClick={toggleTheme}>
      {darkTheme ? (
        <FaMoon size='30' className='text-sky-300' />
      ) : (
        <FaSun size='30' className='text-red-400' />
      )}
    </button>
  );
};

const Header = (): ReactElement => {
  return (
    <header className='header'>
      <HeaderTitle />
      <ThemeSwitch />
    </header>
  );
};

export default Header;
