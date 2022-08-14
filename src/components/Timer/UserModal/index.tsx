import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Button from '../../Button';
import welcomeImg from '../../../assets/img/welcome.png';

interface UserModalProps {
  closeModal: Function,
};

const UserModal = ({ closeModal }: UserModalProps): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (url: string): void => {
    closeModal(closeModal);
    navigate(url);
  };

  return (
    <Modal
      variant='flip'
      closeModal={closeModal}
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
              handleClick={() => handleClick('/login')}
              styles='primary-btn primary-hover-btn w-full'
              text='Sign in'
            />
            <Button
              handleClick={() => handleClick('/register')}
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
