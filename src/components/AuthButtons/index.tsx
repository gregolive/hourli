import { ReactElement } from 'react';
import Google from './Google';
import Github from './Github';
import Twitter from './Twitter';

const AuthButtons = (): ReactElement => {
  return (
    <div className='grid gap-3'>
      <Google />
      <Github />
      <Twitter />
    </div>
  );
};

export default AuthButtons;
