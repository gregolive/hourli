import { ReactElement } from 'react';
import Google from './Google';
import Github from './Github';

const AuthButtons = (): ReactElement => {
  return (
    <div className='grid gap-3'>
      <Google />
      <Github />
    </div>
  );
};

export default AuthButtons;
