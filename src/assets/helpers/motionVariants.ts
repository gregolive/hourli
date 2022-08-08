type VariantProperty = {
  opacity: number;
  transition?: any;
  transform?: any;
  y?: string;
};

type Variant = {
  hidden: VariantProperty,
  visible: VariantProperty,
  exit: VariantProperty,
};

const variants: { [key: string]: Variant } = {
  dropIn: {
    hidden: {
      opacity: 0,
      y: '-100vh',
    },
    visible: {
      opacity: 1,
      y: '0',
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: '100vh',
    },
  },
  flip: {
    hidden: {
      transform: 'scale(0) rotateX(-360deg)',
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
    visible: {
      transform: 'scale(1) rotateX(0deg)',
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      transform: 'scale(0) rotateX(360deg)',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  },
};

export default variants;
