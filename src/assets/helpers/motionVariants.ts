type VariantProperty = {
  opacity: number;
  transition?: any;
  transform?: any;
  x?: string;
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
  slideIn: {
    hidden: {
      opacity: 0,
      x: '-100vw',
    },
    visible: {
      opacity: 1,
      x: '0',
      transition: {
        duration: 1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      x: '100vw',
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
