import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

interface ModalProps {
  setShow: Function,
};

const dropIn = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: '0',
    transition: {
      duration: 0.25,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: '100vh',
  },
};

const SubmitModal = ({ setShow }: ModalProps): ReactElement => {
  return (
    <Backdrop>
      <motion.div
        className='modal'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        drag
      >
        
      </motion.div>
    </Backdrop>
  );
};

export default SubmitModal;
