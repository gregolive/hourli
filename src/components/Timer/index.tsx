import { useState, useEffect, ReactElement } from 'react';

interface CounterProps {
  time: number,
}

const Counter = ({ time }: CounterProps): ReactElement => {
  const format = (time: number, div: number): string => {
    const str = Math.floor((time / div) % 60).toString();
    return (str.length > 1) ? str : '0' + str;
  };

  return (
    <div className='text-8xl sm:text-9xl flex justify-center col-span-2'>
      <span className='w-32 sm:w-40 text-end'>{format(time, 60000)}</span>
      <span>:</span>
      <span className='w-32 sm:w-40'>{format(time, 1000)}</span>
    </div>
  );
};

const Timer = (): ReactElement => {
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);
  
  const toggleTimer = (): void => setPlay(!play);

  useEffect(() => {
    const tick = setTimeout(() => {
      setTime(time + 1000);
    }, 1000);

    return () => clearTimeout(tick);
  });

  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
      <Counter time={time} />

      <button 
        onClick={toggleTimer}
        className='timer-btn bg-teal-500 text-neutral-50 dark:text-neutral-900'
      >
        Start
      </button>

      <button
        className='timer-btn bg-gray-300 dark:bg-slate-700'
      >
        Stop
      </button>
    </div>
  );
};

export default Timer;
