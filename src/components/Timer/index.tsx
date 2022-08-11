import { useState, useEffect, ReactElement } from 'react';
import { useAuth } from '../AuthProvider';
import { AnimatePresence } from 'framer-motion';
import TimerMain from './Main';
import PayPeriodForm from './PayPeriodForm'
import SubmitModal from './SubmitModal';
import UserModal from './UserModal';

const Timer = (): ReactElement => {
  const { user } = useAuth();
  const [showPayPeriod, setShowPayPeriod] = useState(user && typeof user.payPeriodStart === 'undefined');
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
    document.location.reload();
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
console.log(showPayPeriod)
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {(user && showPayPeriod) ? (
          <PayPeriodForm closeModal={() => setShowPayPeriod(false)} key='payPeriodForm' />
        ) : (
          <TimerMain
            shiftStart={shiftStart}
            shiftTime={shiftTime}
            breakStart={breakStart}
            handleClockClick={(shiftStart) ? clockOut : clockIn}
            handleBreakClick={(breakStart) ? offBreak : onBreak}
            key='main'
          />
        )}
      </AnimatePresence>
      
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
