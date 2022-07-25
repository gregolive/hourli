type VariantProperty = {
  opacity: number;
  y: string;
  transition?: any;
};

type Variant = {
  hidden: VariantProperty,
  visible: VariantProperty,
  exit: VariantProperty,
};

const variants: { [key: string]: Variant } = {
  dropIn : {
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
};

export default variants;
