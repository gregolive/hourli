import { useState, ReactElement } from 'react';
import Modal from '../../../Modal';
import Button from '../../../Button';
import { formatTime } from '../../../../assets/helpers/formatTime';
import congratsImg from '../../../../assets/img/congrats.png';

interface ConfirmProps {
  time: number,
  confirmClockOut: Function,
  closeModal: Function,
};

const ConfirmModal = ({ closeModal, confirmClockOut, time }: ConfirmProps): ReactElement => {
  const [shiftTime, setShiftTime] = useState(time); // eslint-disable-line
  const timeString = (): string => `${formatTime(shiftTime, 60000)}:${formatTime(shiftTime, 1000)}`;

  return (
    <Modal
      variant='dropIn'
      closeModal={closeModal}
      children={
        <>
          <img
            className='w-4/5 sm:w-3/5'
            src={congratsImg}
            alt='congratulations'
          />

          <h2 className='text-3xl font-medium pt-4 pb-1'>
            Quitting time?
          </h2>
          <p className='text-lg pb-4'>
            {`Clock out of your ${timeString()} hour shift?`}
          </p>
          
          <div className='flex w-full gap-3'>
            <Button
              handleClick={confirmClockOut}
              styles='primary-btn primary-hover-btn w-full'
              text='Clock out'
            />
            <Button
              handleClick={closeModal}
              styles='secondary-btn secondary-hover-btn w-full'
              text='Cancel'
            />
          </div>
        </>
      }
    />
  );
};

export default ConfirmModal;
