import { useState, ReactElement } from 'react';
import { useAuth } from '../../AuthProvider'
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, sub } from 'date-fns';
import variants from '../../../assets/helpers/motionVariants';

interface PayPeriodModalProps {
  closeModal: Function,
};

const PayPeriodForm = ({ closeModal }: PayPeriodModalProps): ReactElement => {
  const { user } = useAuth();
  const maxDate = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd');
  const types = ['Biweekly', 'Weekly', 'Monthly'];
  const [userData, setUserData] = useState({
    payPeriodStart: maxDate,
    payPeriodType: types[0],
  });
  const [submitError, setSubmitError] = useState(false);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append('payPeriodStart', userData.payPeriodStart);
    formData.append('payPeriodType', userData.payPeriodType);

    return formData;
  };

  const formSubmit = (): void => {
    const formData = buildFormData();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user!._id}/updatePayPeriod`;
    const config = { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true };

    axios.post(url, formData, config)
      .then((res) => {
        closeModal();
      }, (err) => {
        setSubmitError(true);
      });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    formSubmit();
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSubmitError(false);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSubmitError(false);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      className='flex flex-col items-center w-full'
      variants={variants.slideIn}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <h2 className='text-4xl font-medium pb-4'>
        Welcome to <span className='font-semibold'>hour.li</span> 👋
      </h2>
      <p className='text-lg leading-6 pb-4'>
        Just a couple of questions to finish setting up your account.
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

        <button className='btn primary-btn primary-hover-btn' type='submit'>Let's go!</button>
      </form>
    </motion.div>
  );
};

export default PayPeriodForm;
