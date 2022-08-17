import { useState, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Shift } from '../../../../types';
import variants from '../../../assets/helpers/motionVariants';
import { timeToDate } from '../../../assets/helpers/formatTime';

const ShiftsIndex = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>([]);

  // Get shifts on mount
  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/shifts/index`;
    const config = { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true };

    axios.get(url, config)
      .then((res) => {
        setShifts(res.data.shifts);
        setLoading(false);
      }, (err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    (loading) ? (
      <CircularProgress className='!text-teal-500' />
    ) : (
      <motion.div
        className='grow pt-4 w-10/12 max-w-lg'
        variants={variants.slideIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <h2 className='text-4xl font-medium pb-4'>Timesheet</h2>

        {shifts.map((shift, index) =>
          <p key={index}>
            {timeToDate(shift.start)}
          </p>
        )}
      </motion.div>
    )
  );
};

export default ShiftsIndex;
