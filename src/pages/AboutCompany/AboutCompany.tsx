import React from 'react';
import './about-company.css';
import Breadcrumbs from '../../components/Breadcrumbs';

const AboutCompany: React.FC = () => {
  return (
    <main>
      <Breadcrumbs currentPage='О компании' />

      <div className='about-company-container'>
        <h1>Компания BAUTEX</h1>

        <div className='about-content'>
          <div className='about-text'>
            <p>
              Российско-немецкая компания БауТекс — единственный крупнейший производитель
              жаккардовых обоев из кварцевой нити в России. На собственном заводе в городе
              Гусь-Хрустальный мы производим не только продукцию премиум сегмента, но и
              строительные, дорожные стеклосетки, стеклосетки для абразивных кругов, стеклоткани и
              композиционные материалы SMC/BMC и многое другое.
            </p>
            <br />
            <p>
              Наша компания постоянно расширяет производство, применяет инновационные европейские
              технологии, регулярно обновляет и совершенствует процессы и технологии производства.
            </p>
            <br />
            <p>
              На протяжении многих лет компания БауТекс активно развивает и поддерживает деловые
              связи не только в России и СНГ, но и за рубежом — третья часть нашей продукции
              экспортируется в Европу.
            </p>
          </div>
          <div className='about-image'>
            <img src='../images/about-company.jpg' alt='Завод BauTex' />
          </div>
        </div>

        <div className='button-container'>
          <a
            href='https://bau-tex.ru'
            target='_blank'
            rel='noopener noreferrer'
            className='company-button'
          >
            перейти на сайт компании
          </a>
        </div>
      </div>
    </main>
  );
};

export default AboutCompany;
