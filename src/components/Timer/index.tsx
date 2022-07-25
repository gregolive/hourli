import { useState, useEffect, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BiCoffeeTogo } from 'react-icons/bi';
import Button from '../Button';
import SubmitModal from './SubmitModal';
import { formatTime } from '../../assets/helpers/formatTime';

interface SubComponentProps {
  time: number,
};

const Counter = ({ time }: SubComponentProps): ReactElement => {
  return (
    <div className='text-8xl sm:text-9xl flex justify-center col-span-2'>
      <span className='w-32 sm:w-40 text-end'>{formatTime(time, 1000)}</span>
      <span>:</span>
      <span className='w-32 sm:w-40'>{formatTime(time, 60000)}</span>
    </div>
  );
};

const BreakInfo = ({ time }: SubComponentProps): ReactElement => {
  return (
    <>
      <BiCoffeeTogo />
      <span>On break</span>
      <span className='w-14'>
        {formatTime(time, 1000)}:{formatTime(time, 60000)}
      </span>
    </>
  );
};

const Timer = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [shiftStart, setShiftStart] = useState(JSON.parse(window.localStorage.getItem('shiftStart') || '0'));
  const [shiftTime, setShiftTime] = useState(0);
  const [breakStart, setBreakStart] = useState(JSON.parse(window.localStorage.getItem('breakStart') || '0'));
  const [currBreak, setCurrBreak] = useState(JSON.parse(window.localStorage.getItem('currBreak') || '0'));
  const [breaks, setBreaks] = useState(JSON.parse(window.localStorage.getItem('breaks') || '0'));  

  const clockIn = (): void => {
    const time = Date.now();
    setShiftStart(time);
    window.localStorage.setItem('shiftStart', JSON.stringify(time));
  };

  const clockOut = (): void => setShowModal(true);

  const onBreak = (): void => {
    const time = Date.now();
    setBreakStart(time);
    window.localStorage.setItem('breakStart', JSON.stringify(time));
  };

  const offBreak = (): void => {
    const totalBreaks = breaks + currBreak;
    setBreaks(totalBreaks);
    window.localStorage.setItem('breaks', JSON.stringify(totalBreaks));
    setBreakStart(0);
    window.localStorage.setItem('breakStart', JSON.stringify(0));
    setCurrBreak(0);
    window.localStorage.setItem('currBreak', JSON.stringify(0));
  };

  // Update shift clock
  useEffect(() => {
    const tick = setTimeout(() => {
      setShiftTime(Date.now() - shiftStart - currBreak - breaks);
    }, 500);
    if (shiftStart === 0) clearInterval(tick);

    return () => clearTimeout(tick);
  }, [shiftStart, shiftTime, currBreak, breaks]); 

  // Update break clock
  useEffect(() => {
    const tock = setTimeout(() => {
      const breakTime = Date.now() - breakStart;
      setCurrBreak(breakTime);
      window.localStorage.setItem('currBreak', JSON.stringify(breakTime));
    }, 500);
    if (breakStart === 0) clearInterval(tock);

    return () => clearTimeout(tock);
  }, [breakStart, currBreak]);

  return (
    <>
      <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
        <Counter time={shiftTime} />

        <Button 
          handleClick={(shiftStart) ? clockOut : clockIn}
          styles='primary-btn timer-btn'
          text={(shiftStart) ? 'Clock out' : 'Clock in'}
        />

        <Button 
          handleClick={(breakStart) ? offBreak : onBreak}
          styles='secondary-btn timer-btn'
          text={(breakStart) ? 'Off Break' : 'Break'}
          disabled={!shiftStart}
        />

        <div className='text-xl flex items-center justify-center col-span-2 gap-1 h-7'>
          {(breakStart > 0) && 
            <BreakInfo time={Date.now() - breakStart} />
          }
        </div>
      </div>
      
      <AnimatePresence exitBeforeEnter>
        {showModal &&
          <SubmitModal 
            shift={shiftTime}
            closeModal={() => setShowModal(false)}
          />
        }
      </AnimatePresence>
    </>
  );
};

export default Timer;
