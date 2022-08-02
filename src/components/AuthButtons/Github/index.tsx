import { ReactElement } from 'react';
import githubLogo from '../../../assets/img/github.png';

const Github = (): ReactElement => {
  const handleClick = () => window.open(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/github`, '_self');
  
  return (
    <button
      className='btn auth-btn github-btn'
      type='button'
      onClick={handleClick}
    >
      <img
        className='h-6'
        src={githubLogo}
        alt='github logo'
      />
      Sign in with Github
    </button>
  );
};

export default Github;
