import { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface BackdropProps {
  children?: ReactElement;
};

const Backdrop = ({ children }: BackdropProps): ReactElement => {
  return (
    <motion.div
      className='backdrop'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key='backdrop'
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
