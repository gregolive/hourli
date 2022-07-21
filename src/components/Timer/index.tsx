import { ReactElement } from 'react';

const Counter = (): ReactElement => {
  return (
    <div className='col-span-2'>
      <span className='text-8xl sm:text-9xl'>
        03:10
      </span>
    </div>
  );
};

const Timer = (): ReactElement => {
  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
      <Counter />

      <button 
        className='timer-btn bg-teal-500 text-neutral-50 dark:text-neutral-900'
      >
        Start
      </button>
      <button className='timer-btn bg-gray-300 dark:bg-slate-700'>
        Stop
      </button>
    </div>
  );
};

export default Timer;
