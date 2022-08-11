import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import variants from '../../assets/helpers/motionVariants';
import { IoIosCloseCircle } from 'react-icons/io';

interface ModalProps {
  variant: string,
  closeModal: Function | null,
  children: ReactElement,
};

const SubmitModal = ({ variant, closeModal, children }: ModalProps): ReactElement => {
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

        {closeModal &&
          <button 
            className='absolute top-4 right-4 text-gray-400'
            type='button'
            onClick={() => closeModal()}
          >
            <IoIosCloseCircle size='28' />
          </button>
        }
      </motion.div>
    </Backdrop>
  );
};

export default SubmitModal;
