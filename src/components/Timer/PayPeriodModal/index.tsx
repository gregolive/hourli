import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, sub } from 'date-fns'
import Modal from '../../Modal';
import Button from '../../Button';
import updateImg from '../../../assets/img/update.png';

interface PayPeriodModalProps {
  closeModal: Function,
};

const PayPeriodModal = ({ closeModal }: PayPeriodModalProps): ReactElement => {
  const navigate = useNavigate();
  const maxDate = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd');
  const types = ['Biweekly', 'Weekly', 'Monthly'];
  const [userData, setUserData] = useState({
    payPeriodStart: maxDate,
    payPeriodType: types[0],
  });
  const [submitError, setSubmitError] = useState('');
  
  const handleSubmit = () => {

  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSubmitError('');
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSubmitError('');
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      variant='flip'
      closeModal={null}
      children={
        <>
          <img
            className='w-4/5 sm:w-3/5'
            src={updateImg}
            alt='congratulations'
          />

          <h2 className='text-3xl font-medium pt-4 pb-2'>
            Welcome to <span className='font-semibold'>hour.li</span> 👋
          </h2>
          <p className='text-lg leading-6 text-center pb-4'>
            We just need to ask you a couple of questions to finish setting up your account.
          </p>

          <form className='grid w-full gap-3' onSubmit={handleSubmit}>
            <fieldset className='grid gap-1'>
              <label className='label' htmlFor='payPeriodStart'>
                When does your current pay period start?
              </label>
              <input
                className='input'
                type='date'
                id='payPeriodStart'
                name='payPeriodStart'
                value={userData.payPeriodStart}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
              />
            </fieldset>

            <fieldset className='grid gap-1'>
              <label className='label' htmlFor='payPeriodType'>
                When are you paid?
              </label>
              <select
                className='input'
                id='payPeriodType'
                name='payPeriodType'
                value={userData.payPeriodType}
                onChange={handleSelectChange}
              >
                {types.map((type, index) =>
                  <option value={type} key={index}>{type}</option>
                )}
              </select>
            </fieldset>

            {submitError && <small className='text-red-600 dark:text-red-500'>Please try again</small>}

            <Button
              handleClick={() => navigate('/login')}
              styles='primary-btn primary-hover-btn w-full'
              text="Let's go!"
            />
          </form>
        </>
      }
    />
  );
};

export default PayPeriodModal;
