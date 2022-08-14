import { ReactElement } from 'react';
import axios from 'axios';
import Modal from '../../Modal';
import Button from '../../Button';
import { formatClock } from '../../../assets/helpers/formatTime';
import congratsImg from '../../../assets/img/congrats.png';

type Shift = {
  start: number;
  length: number;
  breaks: number;
};

interface SubmitModalProps {
  shift: Shift,
  closeModal: Function,
  clockOut: Function,
};

const SubmitModal = ({ shift, closeModal, clockOut }: SubmitModalProps): ReactElement => {
  const { start, length, breaks } = shift;

  const buildFormData = (): FormData => {
    const formData = new FormData();
    formData.append('start', start.toString());
    formData.append('length', length.toString());
    formData.append('breaks', breaks.toString());

    return formData;
  };

  const handleSubmit = (): void => {
    const formData = buildFormData();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/shifts/create`;
    const config = { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true };

    axios.post(url, formData, config)
      .then((res) => {
        clockOut();
      }, (err) => {
        console.log(err);
      });
  };

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
            Clock out of your {formatClock(length)} hour shift?
          </p>
          
          <div className='flex w-full gap-3'>
            <Button
              handleClick={handleSubmit}
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

export default SubmitModal;
