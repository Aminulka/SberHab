import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import icon from '../assets/icon.png';
import Cross from '../assets/cross.svg';
import DevNoticeModal from '../components/DevNoticeModal';

interface DropdownProps {
  title: string;
  items: Array<{
    href: string;
    text: string;
    className?: string;
    onClick?: () => void;
  }>;
  onItemClick?: () => void;
  isMobile?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, onItemClick, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  return (
    <div
      className={`dropdown ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button className='dropdown-toggle' onClick={() => isMobile && setIsOpen(!isOpen)}>
        {title}
        {!isMobile && <span className='dropdown-arrow'>▼</span>}
      </button>
      <div className='dropdown-menu'>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={item.className}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault(); // Остановим переход по ссылке, если есть кастомный обработчик
                item.onClick();
              }
              handleItemClick();
            }}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [showDevNotice, setShowDevNotice] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  // Хук для отслеживания размера экрана
  useEffect(() => {
    const handleResize = () => {
      // Закрываем меню при ширине больше 1024px
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveMobileDropdown(null);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (title: string) => {
    setActiveMobileDropdown(activeMobileDropdown === title ? null : title);
  };

  const collectionsItems = [
    { href: '/collections/basic', text: 'Basic' },
    { href: '/collections/loft', text: 'Loft', onClick: () => setShowDevNotice(true) },
    { href: '/collections/geometry', text: 'Geometry', onClick: () => setShowDevNotice(true) },
    { href: '/collections/minimalism', text: 'Minimalism', onClick: () => setShowDevNotice(true) },
    { href: '/collections/classic', text: 'Classic', onClick: () => setShowDevNotice(true) },
    { href: '/collections/kids', text: 'Kids', onClick: () => setShowDevNotice(true) },
  ];

  const aboutItems = [
    { href: '#', text: 'О BauTex Design', onClick: () => setShowDevNotice(true) },
    { href: '/about/company', text: 'О компании', className: 'company-link' },
    { href: '/about/projects', text: 'Проекты' },
    { href: '/about/reviews', text: 'Отзывы' },
    { href: '/about/certificates', text: 'Сертификаты' },
    { href: '#', text: 'Контакты', onClick: () => setShowDevNotice(true) },
  ];

  const infoItems = [
    { href: '/info/how-to-paste', text: 'Как клеить', onClick: () => setShowDevNotice(true) },
    { href: '/info/how-to-paint', text: 'Как красить' },
  ];

  return (
    <header
      className={`${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
    >
      <div className='logo-section'>
        <Link to='/' onClick={closeMobileMenu}>
          <img src={icon} alt='Logo' className='logo' />
        </Link>
        <div className='slogan-container'>
          Жаккардовые обои
          <br />
          из кварцевой нити
          <br />
          под покраску
        </div>
      </div>

      {/* Гамбургер-меню для мобильной версии */}
      <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <Cross className='cross-icon' />
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </div>

      {/* Десктопное меню */}
      <nav className='desktop-nav'>
        <Dropdown title='Коллекции' items={collectionsItems} />
        <button className='nav-button' onClick={() => navigate('/where-to-buy')}>
          Купить
        </button>
        <Dropdown title='О нас' items={aboutItems} />
        <Dropdown title='Полезное' items={infoItems} />
        <button className='nav-button' onClick={() => setShowDevNotice(true)}>
          Для партнеров
        </button>
      </nav>

      <div className='phone desktop-phone' onClick={() => window.open('tel:+74955329112')}>
        +7 (495) 532-91-12
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className='mobile-menu-overlay'>
          {activeMobileDropdown ? (
            <div className='mobile-dropdown-content'>
              <button className='mobile-back-button' onClick={() => setActiveMobileDropdown(null)}>
                ← Назад
              </button>

              {activeMobileDropdown === 'Коллекции' && (
                <div className='mobile-submenu'>
                  {collectionsItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className='mobile-menu-item'
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        closeMobileMenu();
                      }}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}

              {activeMobileDropdown === 'О нас' && (
                <div className='mobile-submenu'>
                  {aboutItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className='mobile-menu-item'
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        closeMobileMenu();
                      }}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}

              {activeMobileDropdown === 'Полезное' && (
                <div className='mobile-submenu'>
                  {infoItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className='mobile-menu-item'
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        closeMobileMenu();
                      }}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className='mobile-main-menu'>
              <button
                className='mobile-menu-button'
                onClick={() => toggleMobileDropdown('Коллекции')}
              >
                Коллекции
              </button>

              <button
                className='mobile-menu-button'
                onClick={() => {
                  navigate('/where-to-buy');
                  closeMobileMenu();
                }}
              >
                Купить
              </button>

              <button className='mobile-menu-button' onClick={() => toggleMobileDropdown('О нас')}>
                О нас
              </button>

              <button
                className='mobile-menu-button'
                onClick={() => toggleMobileDropdown('Полезное')}
              >
                Полезное
              </button>

              <button
                className='mobile-menu-button'
                onClick={() => {
                  setShowDevNotice(true);
                  closeMobileMenu();
                }}
              >
                Для партнеров
              </button>

              <button
                className='mobile-menu-button phone-button'
                onClick={() => {
                  window.open('tel:+74955329112');
                  closeMobileMenu();
                }}
              >
                +7 (495) 532-91-12
              </button>
            </div>
          )}
        </div>
      )}
      {showDevNotice && <DevNoticeModal onClose={() => setShowDevNotice(false)} />}
    </header>
  );
};

export default Header;
