import { useState, useEffect, ReactElement } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import TimerButton from './TimerButton';

interface SubComponentProps {
  time: number,
};

const formatClock = (time: number, div: number): string => {
  const str = Math.floor((time / div) % 60).toString();
  return (str.length > 1) ? str : '0' + str;
};

const Counter = ({ time }: SubComponentProps): ReactElement => {
  return (
    <div className='text-8xl sm:text-9xl flex justify-center col-span-2'>
      <span className='w-32 sm:w-40 text-end'>{formatClock(time, 1000)}</span>
      <span>:</span>
      <span className='w-32 sm:w-40'>{formatClock(time, 60000)}</span>
    </div>
  );
};

const BreakInfo = ({ time }: SubComponentProps): ReactElement => {
  return (
    <>
      <BiCoffeeTogo />
      <span>On break</span>
      <span className='w-14'>
        {formatClock(time, 1000)}:{formatClock(time, 60000)}
      </span>
    </>
  );
};

const Timer = (): ReactElement => {
  const [shiftStart, setShiftStart] = useState(0);
  const [shiftTime, setShiftTime] = useState(0);
  const [breakStart, setBreakStart] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [breaks, setBreaks] = useState(0);

  const clockInOut = (): void => {
    if (!shiftStart) {
      setShiftStart(Date.now());
    } else {
      setShiftStart(0);
    }
  };

  const toggleBreak = (): void => {
    if (!breakStart) {
      setBreakStart(Date.now());
    } else {
      setBreaks(breaks + breakTime);
      setBreakStart(0);
      setBreakTime(0);
    }
  };

  // Update shift clock
  useEffect(() => {
    const tick = setTimeout(() => {
      setShiftTime(Date.now() - shiftStart - breakTime - breaks);
    }, 500);
    if (shiftStart === 0) clearInterval(tick);

    return () => clearTimeout(tick);
  }, [shiftStart, shiftTime, breakTime, breaks]); 

  // Update break clock
  useEffect(() => {
    const tock = setTimeout(() => {
      setBreakTime(Date.now() - breakStart);
    }, 500);
    if (breakStart === 0) clearInterval(tock);

    return () => clearTimeout(tock);
  }, [breakStart, breakTime]);

  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
      <Counter time={shiftTime} />

      <TimerButton 
        handleClick={clockInOut}
        styles='bg-teal-500 text-neutral-50 dark:text-neutral-900'
        text={(shiftStart) ? 'Clock out' : 'Clock in'}
      />

      <TimerButton 
        handleClick={toggleBreak}
        styles='bg-gray-300 dark:bg-cyan-900'
        text={(breakStart) ? 'Off Break' : 'Break'}
        disabled={!shiftStart}
      />

      <div className='text-xl flex items-center justify-center col-span-2 gap-1 h-7'>
        {(breakStart > 0) && <BreakInfo time={Date.now() - breakStart} />}
      </div>
    </div>
  );
};

export default Timer;
