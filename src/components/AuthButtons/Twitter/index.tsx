import { ReactElement } from 'react';
import twitterLogo from '../../../assets/img/twitter.png';

const Twitter = (): ReactElement => {
  const handleClick = () => window.location.href = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/twitter`;

  return (
    <button
      className='btn auth-btn twitter-btn'
      type='button'
      onClick={handleClick}
    >
      <img
        className='h-6'
        src={twitterLogo}
        alt='twitter logo'
      />
      Sign in with Twitter
    </button>
  );
};

export default Twitter;
