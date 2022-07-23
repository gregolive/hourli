import { ReactElement } from 'react';

interface ButtonProps {
  handleClick: Function,
  styles: string,
  text: string,
  disabled?: boolean,
};

const Button = ({ handleClick, styles, text, disabled }: ButtonProps): ReactElement => {
  return (
    <button
      className={`btn ${styles}`} 
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
