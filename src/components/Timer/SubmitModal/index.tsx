import { useState, ReactElement } from 'react';
import ConfirmModal from './Confirm';

interface SubmitModalProps {
  shift: number,
  closeModal: Function,
};

const SubmitModal = ({ shift, closeModal }: SubmitModalProps): ReactElement => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {!confirmed && 
        <ConfirmModal
          shift={shift}
          confirmClockOut={() => setConfirmed(true)}
          closeModal={closeModal}
        />
      }        

      {confirmed && 
        <ConfirmModal
          shift={shift}
          confirmClockOut={() => setConfirmed(false)}
          closeModal={closeModal}
        />
      }
    </>
  );
};

export default SubmitModal;
