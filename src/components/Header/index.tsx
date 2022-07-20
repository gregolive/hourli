import { ReactElement } from 'react';
import useDarkTheme from '../../hooks/useDarkTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const HeaderTitle = (): ReactElement => {
  return (
    <h1 className='text-4xl italic'>
      <span className='text-red-400 font-bold'>hour</span>
      <span className='text-sky-400 font-medium'>min</span>
    </h1>
  );
}

const ThemeSwitch = (): ReactElement => {
  const [darkTheme, setDarkTheme] = useDarkTheme();
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  return (
    <button onClick={toggleTheme}>
      {darkTheme ? (
        <FaMoon size='30' className='text-sky-400' />
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
