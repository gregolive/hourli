import { useState, useEffect, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BiCoffeeTogo } from 'react-icons/bi';
import Button from '../Button';
import SubmitModal from './SubmitModal';

interface SubComponentProps {
  time: number,
  formatTime: Function,
};

const Counter = ({ time, formatTime }: SubComponentProps): ReactElement => {
  return (
    <div className='text-8xl sm:text-9xl flex justify-center col-span-2'>
      <span className='w-32 sm:w-40 text-end'>{formatTime(time, 1000)}</span>
      <span>:</span>
      <span className='w-32 sm:w-40'>{formatTime(time, 60000)}</span>
    </div>
  );
};

const BreakInfo = ({ time, formatTime }: SubComponentProps): ReactElement => {
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
  const [shiftStart, setShiftStart] = useState(0);
  const [shiftTime, setShiftTime] = useState(0);
  const [breakStart, setBreakStart] = useState(0);
  const [currBreak, setCurrBreak] = useState(0);
  const [breaks, setBreaks] = useState(0);

  const formatTime = (time: number, div: number): string => {
    const str = Math.floor((time / div) % 60).toString();
    return (str.length > 1) ? str : '0' + str;
  };  

  const clockIn = (): void => setShiftStart(Date.now());

  const clockOut = (): void => setShowModal(true);

  const onBreak = (): void => setBreakStart(Date.now());

  const offBreak = (): void => {
    setBreaks(breaks + currBreak);
    setBreakStart(0);
    setCurrBreak(0);
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
      setCurrBreak(Date.now() - breakStart);
    }, 500);
    if (breakStart === 0) clearInterval(tock);

    return () => clearTimeout(tock);
  }, [breakStart, currBreak]);

  return (
    <>
      <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
        <Counter time={shiftTime} formatTime={formatTime} />

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
            <BreakInfo time={Date.now() - breakStart} formatTime={formatTime} />
          }
        </div>
      </div>

      <AnimatePresence exitBeforeEnter>
        {showModal && 
          <SubmitModal
            setModal={setShowModal}
            shift={shiftTime}
            formatTime={formatTime}
          />
        }
      </AnimatePresence>
    </>
  );
};

export default Timer;
