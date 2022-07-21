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
      <span className='w-32 sm:w-40 text-end'>{formatClock(time, 3600000)}</span>
      <span>:</span>
      <span className='w-32 sm:w-40'>{formatClock(time, 60000)}</span>
    </div>
  );
};

const BreakInfo = ({ time }: SubComponentProps): ReactElement => {
  return (
    <>
      <BiCoffeeTogo />
      <span>Break time</span>
      <span className='w-14'>
        {formatClock(time, 3600000)}:{formatClock(time, 60000)}
      </span>
    </>
  );
};

const Timer = (): ReactElement => {
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [timing, setTiming] = useState(false);
  const [working, setWorking] = useState(false);
  
  const toggleTimer = (): void => setTiming(!timing);
  const clockInOut = (): void => {
    setWorking(!working);
    toggleTimer();
  };

  useEffect(() => {
    let tick = setTimeout(() => {
      setTime(time + 1000);
    }, 1000);
    if (!timing) clearInterval(tick);

    return () => clearTimeout(tick);
  }, [time, timing]);

  useEffect(() => {
    let tock = setTimeout(() => {
      setBreakTime(breakTime + 1000);
    }, 1000);
    if (working && timing) clearInterval(tock);

    return () => clearTimeout(tock);
  }, [breakTime, timing, working]);

  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
      <Counter time={time} />

      <TimerButton 
        handleClick={clockInOut}
        styles='bg-teal-500 text-neutral-50 dark:text-neutral-900'
        text={(working) ? 'Clock out' : 'Clock in'}
      />

      <TimerButton 
        handleClick={toggleTimer}
        styles='bg-gray-300 dark:bg-cyan-900'
        text={(working && !timing) ? 'Off Break' : 'Break'}
        disabled={!working}
      />

      <div className='text-xl flex items-center justify-center col-span-2 gap-1 h-7'>
        {(working && !timing) && <BreakInfo time={breakTime} />}
      </div>
    </div>
  );
};

export default Timer;
