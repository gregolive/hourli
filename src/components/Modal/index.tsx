import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import variants from '../../assets/helpers/motionVariants';

interface ModalProps {
  variant: string,
  children: ReactElement,
};

const SubmitModal = ({ variant, children }: ModalProps): ReactElement => {
  return (
    <Backdrop>
      <motion.div
        className='modal'
        variants={variants[variant]}
        initial='hidden'
        animate='visible'
        exit='exit'
        drag
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default SubmitModal;
