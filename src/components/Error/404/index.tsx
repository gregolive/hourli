import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import lost from '../../../assets/img/lost.png';

const Error404 = (): ReactElement => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <div className='flex flex-col items-center px-4'>
      <img
        className='w-8/12 max-w-sm'
        src={lost}
        alt='error 500' 
      />

      <h2 className='text-2xl sm:text-3xl font-bold text-blue-500-500 py-4'>404 - Page not found</h2>
      <p className='text-center font-light'>This is not the page you are looking for.</p>
  
      <Button
        handleClick={handleClick}
        styles='btn primary-btn primary-hover-btn px-3 mt-4'
        text='Back Home'
      />
    </div>
  );
};

export default Error404;
