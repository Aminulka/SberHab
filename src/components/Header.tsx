import React from 'react';
import '../styles/header.css';

const Header: React.FC = () => {
  return (
    <header>
      <div className='logo-section'>
        <img src='/images/icon.png' alt='Logo' className='logo' />
        <div className='slogan-container'>
          Жаккардовые обои
          <br />
          из кварцевой нити
          <br />
          под покраску
        </div>
      </div>
      <nav>
        <div className='dropdown' id='collectionsDropdown'>
          <button className='dropdown-toggle'>Коллекции</button>
          <div className='dropdown-menu'>
            <a href='/collections/basic'>Basic</a>
            <a href='/collections/loft'>Loft</a>
            <a href='/collections/geometry'>Geometry</a>
            <a href='/collections/minimalism'>Minimalism</a>
            <a href='/collections/classic'>Classic</a>
            <a href='/collections/kids'>Kids</a>
          </div>
        </div>
        <button className='nav-button' onClick={() => window.open('/where-to-buy', '_blank')}>
          Где купить
        </button>
        <div className='dropdown' id='aboutDropdown'>
          <button className='dropdown-toggle'>О нас</button>
          <div className='dropdown-menu'>
            <a href='/about/design'>О BauTex Design</a>
            <a href='/about/company' className='company-link'>
              О компании
            </a>
            <a href='/about/projects'>Проекты</a>
            <a href='/about/reviews'>Отзывы</a>
            <a href='/about/certificates'>Сертификаты</a>
            <a href='/about/contacts'>Контакты</a>
          </div>
        </div>
        <div className='dropdown' id='infoDropdown'>
          <button className='dropdown-toggle'>Полезное</button>
          <div className='dropdown-menu'>
            <a href='/info/how-to-paste'>Как клеить</a>
            <a href='/info/how-to-paint'>Как красить</a>
          </div>
        </div>
        <button className='nav-button' onClick={() => window.open('/partners', '_blank')}>
          Для партнеров
        </button>
      </nav>
      <div className='phone' onClick={() => window.open('tel:+74955329112')}>
        +7 (495) 532-91-12
      </div>
    </header>
  );
};

export default Header;
