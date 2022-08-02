import { ReactElement } from 'react';
import { useAuth } from '../AuthProvider';
import useDarkTheme from '../../hooks/useDarkTheme';
import { useNavigate } from 'react-router-dom'      
import { FaSun, FaMoon } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

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
        <FaMoon size='22' className='text-sky-300' />
      ) : (
        <FaSun size='25' className='text-red-400' />
      )}
    </button>
  );
};

const HeaderButtons = (): ReactElement => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='flex gap-3'>
      <ThemeSwitch />
  
      {(user) ? (
        <>
          <button type='button' onClick={() => handleLogout()}>
            <FiLogOut size='25' className='text-teal-500' />
          </button>
        </>
      ) : (
        <button type='button' onClick={() => navigate('/login')}>
          <FiLogIn size='25' className='text-teal-500' />
        </button>
      )}
    </div>
  );
}

const Header = (): ReactElement => {
  return (
    <header className='header'>
      <HeaderTitle />
      <HeaderButtons />
    </header>
  );
};

export default Header;
