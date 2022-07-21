import { ReactElement } from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = (): ReactElement => {
  return (
    <footer className='flex items-end py-3 h-24'>
      <a href='https://github.com/gregolive/hourmin' target='_blank' rel='noreferrer'>
        <FaGithub size='28' />
      </a>
    </footer>
  );
};

export default Footer;
