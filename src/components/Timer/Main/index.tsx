import { ReactElement } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import Button from '../../Button';
import { formatTime } from '../../../assets/helpers/formatTime';

interface TimerMainProps {
  shiftStart: number,
  shiftTime: number,
  breakStart: number,
  handleClockClick: Function,
  handleBreakClick: Function,
};

interface SubComponentProps {
  time: number,
};

const Counter = ({ time }: SubComponentProps): ReactElement => {
  return (
    <div className='text-8xl sm:text-9xl flex justify-center col-span-2'>
      <span className='w-32 sm:w-40 text-end'>{formatTime(time, 3600000)}</span>
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
        {formatTime(time, 3600000)}:{formatTime(time, 60000)}
      </span>
    </>
  );
};

const TimerMain = ({ shiftStart, shiftTime, breakStart, handleClockClick, handleBreakClick }: TimerMainProps): ReactElement => {
  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
      <Counter time={shiftTime} />

      <Button 
        handleClick={handleClockClick}
        styles='primary-btn grow-btn text-2xl'
        text={(shiftStart) ? 'Clock out' : 'Clock in'}
      />

      <Button 
        handleClick={handleBreakClick}
        styles='secondary-btn grow-btn text-2xl'
        text={(breakStart) ? 'Off Break' : 'Break'}
        disabled={!shiftStart}
      />

      <div className='text-xl flex items-center justify-center col-span-2 gap-1 h-7'>
        {(breakStart > 0) && 
          <BreakInfo time={Date.now() - breakStart} />
        }
      </div>
    </div>
  );
};

export default TimerMain;
