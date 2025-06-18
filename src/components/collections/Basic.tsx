import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/collections.css';
import basic1 from '../../assets/icon.png';

const Basic: React.FC = () => {
  return (
    <main>
      <div className='breadcrumbs'>
        <Link to='/'>ГЛАВНАЯ</Link>
        <Link to='/collections'>КОЛЛЕКЦИИ</Link>
        <span>BASIC</span>
      </div>

      <div className='collection-container'>
        <h1>Коллекция Basic</h1>

        <div className='collection-grid'>
          <div className='collection-item'>
            <img src={basic1} alt='Basic 1' />
            <div className='item-info'>
              <h3>BT 1001</h3>
              <p>Классический рисунок</p>
            </div>
          </div>
          <div className='collection-item'>
            <img src={basic1} alt='Basic 2' />
            <div className='item-info'>
              <h3>BT 1002</h3>
              <p>Современный узор</p>
            </div>
          </div>
          <div className='collection-item'>
            <img src={basic1} alt='Basic 3' />
            <div className='item-info'>
              <h3>BT 1003</h3>
              <p>Геометрический паттерн</p>
            </div>
          </div>
        </div>

        <div className='collection-description'>
          <h2>О коллекции</h2>
          <p>
            Коллекция Basic представляет собой базовые варианты жаккардовых обоев, которые подойдут
            для любого интерьера. Простые и элегантные узоры, качественные материалы и доступная
            цена делают эту коллекцию идеальным выбором для первого знакомства с брендом BauTex
            Design.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Basic;
