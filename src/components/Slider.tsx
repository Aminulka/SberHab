import React, { useState } from 'react';
import '../styles/slider.css';
import slider1 from '../assets/slides/slider1.jpg';
import slider2 from '../assets/slides/slider2.jpg';
import slider3 from '../assets/slides/slider3.jpg';
import slider4 from '../assets/slides/slider4.jpg';
import ArrowLeft from '../assets/Vector-left.svg';
import ArrowRight from '../assets/Vector-rigth.svg';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slider1,
      instructionText:
        'Обои не требуют тщательной подготовки стен перед поклейкой, потому что их высокая плотность отлично скроет небольшие трещины и неровности. Это экономит силы и время: \n' +
        'вам не придется шпатлевать мелкие дефекты. ',
    },
    {
      image: slider2,
      instructionText:
        'Поклеить такие обои сможет каждый: \n' +
        'просто посмотрите <a href="/instructions" class="instruction-link">инструкцию</a> и ничего не бойтесь!',
    },
    {
      image: slider3,
      instructionText:
        'После поклейки нужно окрасить стену в выбранный цвет. Это тоже легко - просто следуйте <a href="/instructions" class="instruction-link">инструкции</a>.',
    },
    {
      image: slider4,
      instructionText:
        'Завершили поклейку? Пора расставлять мебель! \n' +
        'И тут будьте уверены: в отличие от обычных обоев \n' +
        'или декоративной штукатурки вы точно не повредите BauTex Design, если заденете \n' +
        'их углом стола или ножкой стула. ',
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className='slider-container'>
      {/* Левая часть - слайдер с изображениями */}
      <div className='slider-image-part'>
        <div className='slider-track' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className='slider-slide'>
              <img src={slide.image} alt={`Проект ${index + 1}`} className='slider-img' />
            </div>
          ))}
        </div>
      </div>

      {/* Правая часть - текстовая подложка */}
      <div className='slider-text-panel'>
        <>
          <div className='text-content'>
            <h1>Что такое BauTex Design?</h1>
            <p className='description'>
              Мы производим обои из кварцевой нити и крахмала, чтобы вы могли создать свой
              уникальный дизайн интерьера самостоятельно без труда и лишних затрат!
            </p>

            <div className='divider-with-text'>
              <div className='line'></div>
              <span>Вот как это работает:</span>
              <div className='line'></div>
            </div>

            <p
              className='instruction-text'
              dangerouslySetInnerHTML={{ __html: slides[currentSlide].instructionText }}
            />

            <div className='horizontal-line'></div>

            <p className='final-description'>
              Вы сможете разработать фактуру обоев сами! BauTex Design производятся на жаккардовом
              станке, который можно запрограммировать на создание любого дизайна.
            </p>
          </div>
          <div className='slider-navigation'>
            <button
              className={`slider-arrow prev ${currentSlide === 0 ? 'disabled' : ''}`}
              onClick={prevSlide}
            >
              <ArrowLeft />
            </button>

            <div className='slider-dots'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <button
              className={`slider-arrow next ${currentSlide === slides.length - 1 ? 'disabled' : ''}`}
              onClick={nextSlide}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Slider;
