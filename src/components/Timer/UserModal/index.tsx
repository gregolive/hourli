import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Button from '../../Button';
import welcomeImg from '../../../assets/img/welcome.png';

const UserModal = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Modal
      variant='dropIn'
      children={
        <>
          <img
            className='w-4/5 sm:w-3/5'
            src={welcomeImg}
            alt='congratulations'
          />

          <h2 className='text-3xl font-medium pt-4 pb-1'>
            Clocking in?
          </h2>
          <p className='text-lg pb-4'>
            Sign in to your account or register to track your hours.
          </p>
          
          <div className='flex w-full gap-3'>
            <Button
              handleClick={() => navigate('/login')}
              styles='primary-btn primary-hover-btn w-full'
              text='Sign in'
            />
            <Button
              handleClick={() => navigate('/register')}
              styles='secondary-btn secondary-hover-btn w-full'
              text='Register'
            />
          </div>
        </>
      }
    />
  );
};

export default UserModal;
