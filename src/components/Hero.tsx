import React, { useState, useEffect } from 'react';
import '../styles/hero.css';
import hero1 from '../assets/hero/design-version-hero-1.jpg';
import hero2 from '../assets/hero/design-version-hero-2.jpg';
import hero3 from '../assets/hero/design-version-hero-3.jpg';
import background from '../assets/background_list.png';

const slides = [
  { image: hero1, background: '#B1918F' },
  { image: hero2, background: '#9DAD9C' },
  { image: hero3, background: '#A0ADC0' },
];

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = slides[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='hero-section' style={{ backgroundColor: current.background }}>
      {/* Фоновый оверлей (если нужен) */}
      <img src={background} alt='Overlay' className='hero-overlay' />

      {/* Текст поверх слайдера (но не фона) */}
      <div className='hero-text-overlay'>
        Жаккардовые<span> обои</span>
        <br />
        из кварцевой нити
      </div>

      {/* Слайдер */}
      <div className='hero-image-wrapper'>
        <img src={current.image} alt={`Slide ${activeIndex}`} className='hero-image' />
      </div>

      {/* Кнопки переключения */}
      <div className='hero-buttons'>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`hero-button ${activeIndex === idx ? 'active' : ''}`}
          >
            Оттенок {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
