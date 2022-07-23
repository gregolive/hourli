import { useState, ReactElement } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import Button from '../../Button';
import congratsImg from '../../../assets/img/congrats.png';

interface ModalProps {
  setModal: Function,
  shift: number,
  formatTime: Function,
};

const dropIn = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: '0',
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: '100vh',
  },
};

const SubmitModal = ({ setModal, shift, formatTime }: ModalProps): ReactElement => {
  const [shiftTime, setShiftTime] = useState(shift); // eslint-disable-line

  const timeString = (): string => `${formatTime(shiftTime, 60000)}:${formatTime(shiftTime, 1000)}`;

  const submitHours = (): void => {
    
  };

  return (
    <Backdrop>
      <motion.div
        className='modal'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        drag
      >
        <img
          className='w-4/5 sm:w-3/5 col-span-2'
          src={congratsImg}
          alt='congratulations'
        />

        <h2 className='text-3xl font-medium col-span-2 pt-4 pb-1'>
          Quitting time?
        </h2>
        <p className='text-lg col-span-2 pb-4'>
          {`Clock out of your ${timeString()} hour shift?`}
        </p>
        
        <Button
          handleClick={submitHours}
          styles='primary-btn timer-btn w-full'
          text='Clock out'
        />
        <Button
          handleClick={() => setModal(false)}
          styles='secondary-btn timer-btn w-full'
          text='Cancel'
        />
      </motion.div>
    </Backdrop>
  );
};

export default SubmitModal;
