import { useState, ReactElement } from 'react';
import axios from 'axios';
import ConfirmModal from './Confirm';

type Shift = {
  start: number;
  length: number;
  breaks: number;
};

interface SubmitModalProps {
  shift: Shift,
  closeModal: Function,
};

const SubmitModal = ({ shift, closeModal }: SubmitModalProps): ReactElement => {
  const { start, length, breaks } = shift;
  const [confirmed, setConfirmed] = useState(false);

  const buildFormData = (): FormData => {
    const formData = new FormData();
    formData.append('start', start.toString());
    formData.append('length', length.toString());
    formData.append('breaks', breaks.toString());

    return formData;
  };

  const handleSubmit = (): void => {
    const formData = buildFormData();
    const url = `${process.env.REACT_APP_SERVER_URL}/shifts/create`;
    const config = { headers: { 'content-type': 'multipart/form-data' } };

    axios.post(url, formData, config)
      .then((res) => {
        console.log(res.data);
      }, (err) => {
        console.log(err)
      });
  };

  return (
    <>
      {!confirmed && 
        <ConfirmModal
          time={length}
          confirmClockOut={() => setConfirmed(true)}
          closeModal={closeModal}
        />
      }        

      {confirmed && 
        <ConfirmModal
          time={length}
          confirmClockOut={handleSubmit}
          closeModal={closeModal}
        />
      }
    </>
  );
};

export default SubmitModal;
