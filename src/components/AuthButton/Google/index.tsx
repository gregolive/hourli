import { ReactElement } from 'react';
import googleLogo from '../../../assets/img/google.png';

const Google = (): ReactElement => {
  return (
    <button
      className='btn auth-btn bg-white text-blue-600'
      type='button'
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
