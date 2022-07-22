import { ReactElement } from 'react';

interface ButtonProps {
  handleClick: Function,
  styles: string,
  text: string,
  disabled?: boolean,
};

const TimerButton = ({ handleClick, styles, text, disabled }: ButtonProps): ReactElement => {
  return (
    <button
      className={`timer-btn ${styles}`} 
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default TimerButton;
