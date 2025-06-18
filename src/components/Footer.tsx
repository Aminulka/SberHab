import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import icon from '../assets/icon.png';
import tg from '../assets/tg.png';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <Link to='/about/company' className='footer-link'>
          О компании
        </Link>

        <Link to='/' className='footer-logo'>
          <img src={icon} alt='Логотип' className='logo-img' />
        </Link>

        <a
          href='https://t.me/your_channel'
          className='social-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={tg} alt='Telegram' className='social-img' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
