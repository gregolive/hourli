import { ReactElement } from 'react';
import googleLogo from '../../../assets/img/google.png';

const Google = (): ReactElement => {
  const handleClick = () => window.open(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/google`, '_self');

  return (
    <button
      className='btn auth-btn google-btn'
      type='button'
      onClick={handleClick}
    >
      <img
        className='h-6'
        src={googleLogo}
        alt='google logo'
      />
      Sign in with Google
    </button>
  );
};

export default Google;
