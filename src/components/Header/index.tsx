import { ReactElement } from 'react';
import { useAuth } from '../AuthProvider';
import useDarkTheme from '../../hooks/useDarkTheme';
import { useNavigate } from 'react-router-dom'      
import { FaSun, FaMoon, FaUserPlus, FaRegCalendar } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

interface IconBtnProps {
  Icon: React.ReactNode,
  handleClick: Function,
  tooltip: string,
};

const HeaderTitle = (): ReactElement => {
  return (
    <a href='/' className='group'>
      <h1 className='text-4xl font-medium'>
        <span className='text-teal-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-all duration-300'>
          hour
        </span>
        <span className='text-neutral-900 dark:text-neutral-50 group-hover:text-teal-500 transition-all duration-300'>
          .li
        </span>
      </h1>
    </a>
  );
};

const HeaderIconBtn = ({ Icon, handleClick, tooltip }: IconBtnProps): ReactElement => {
  return (
    <div className='header-icon group'>
      <button type='button' onClick={() => handleClick()}>
        {Icon}
      </button>

      <span className='header-tooltip group-hover:scale-100'>
        {tooltip}
      </span>
    </div>
  );
};

const ThemeSwitch = (): ReactElement => {
  const [darkTheme, setDarkTheme] = useDarkTheme();
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  return (
    darkTheme ? (
      <HeaderIconBtn
        Icon={<FaMoon size='22' className='text-sky-300' />}
        handleClick={toggleTheme}
        tooltip='Toggle theme'
      />
    ) : (
      <HeaderIconBtn
        Icon={<FaSun size='22' className='text-red-400' />}
        handleClick={toggleTheme}
        tooltip='Toggle theme'
      />
    )
  );
};

const HeaderButtons = (): ReactElement => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-3'>
      <ThemeSwitch />
  
      {(user) ? (
        <>
          <HeaderIconBtn
            Icon={<FaRegCalendar size='22' className='text-teal-500' />}
            handleClick={() => navigate('/timesheet')}
            tooltip='Timesheet'
          />
          <HeaderIconBtn
            Icon={<FiLogOut size='25' className='text-teal-500' />}
            handleClick={() => handleLogout()}
            tooltip='Logout'
          />
        </>
      ) : (
        <>
          <HeaderIconBtn
            Icon={<FiLogIn size='25' className='text-teal-500' />}
            handleClick={() => navigate('/login')}
            tooltip='Sign in'
          />
          <HeaderIconBtn
            Icon={<FaUserPlus size='25' className='text-teal-500' />}
            handleClick={() => navigate('/register')}
            tooltip='Register'
          />
        </>
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
