import { useState, useEffect, ReactElement } from 'react';
import { useAuth } from '../AuthProvider';
import { AnimatePresence } from 'framer-motion';
import { BiCoffeeTogo } from 'react-icons/bi';
import Button from '../Button';
import SubmitModal from './SubmitModal';
import UserModal from './UserModal';
import { formatTime } from '../../assets/helpers/formatTime';

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

const Timer = (): ReactElement => {
  const { user } = useAuth();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [shiftStart, setShiftStart] = useState<number>(JSON.parse(window.localStorage.getItem('shiftStart') || '0'));
  const [shiftTime, setShiftTime] = useState(0);
  const [breakStart, setBreakStart] = useState<number>(JSON.parse(window.localStorage.getItem('breakStart') || '0'));
  const [currBreak, setCurrBreak] = useState<number>(JSON.parse(window.localStorage.getItem('currBreak') || '0'));
  const [breaks, setBreaks] = useState<number>(JSON.parse(window.localStorage.getItem('breaks') || '0'));  

  const clockIn = (): void => {
    if (!user) {
      setShowUserModal(true);
      return;
    }

    const time = Date.now();
    setShiftStart(time);
    window.localStorage.setItem('shiftStart', JSON.stringify(time));
  };

  const clockOut = (): void => {
    if (!user) {
      setShowUserModal(true);
      return;
    }
    
    setShowSubmitModal(true);
  };

  const clockOutFinal = (): void => {
    window.localStorage.setItem('shiftStart', '0');
    window.localStorage.setItem('shiftTime', '0');
    window.localStorage.setItem('breakStart', '0');
    window.localStorage.setItem('currBreak', '0');
    window.localStorage.setItem('breaks', '0');
    //document.location.reload();
  };

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
          styles='primary-btn grow-btn text-2xl'
          text={(shiftStart) ? 'Clock out' : 'Clock in'}
        />

        <Button 
          handleClick={(breakStart) ? offBreak : onBreak}
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
      
      <AnimatePresence exitBeforeEnter>
        {showSubmitModal &&
          <SubmitModal 
            shift={{
              start: shiftStart,
              length: shiftTime,
              breaks: breaks,
            }}
            closeModal={() => setShowSubmitModal(false)}
            clockOut={clockOutFinal}
          />
        }
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {showUserModal && 
          <UserModal closeModal={() => setShowUserModal(false)} />
        }
      </AnimatePresence>
    </>
  );
};

export default Timer;
