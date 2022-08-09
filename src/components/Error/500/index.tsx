import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import unplugged from '../../../assets/img/unplugged.png';

const Error500 = (): ReactElement => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='flex flex-col items-center px-4'>
      <img
        className='w-8/12 max-w-sm'
        src={unplugged}
        alt='error 500' 
      />

      <h2 className='text-2xl sm:text-3xl font-bold text-blue-500-500 py-4'>500 - Internal Server Error</h2>
      <p className='text-center font-light'>
        Whoops! We're sorry but something went wrong on our end.
        Please try again later.
      </p>
  
      <Button
        handleClick={handleClick}
        styles='btn primary-btn primary-hover-btn px-3 mt-4'
        text='Back Home'
      />
    </div>
  );
};

export default Error500;
