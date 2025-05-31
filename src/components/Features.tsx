import React from 'react';
import '../styles/features.css';

const Features: React.FC = () => {
  return (
    <div className='features'>
      <div className='feature'>
        <img src='/images/3block_lapa.png' alt='Антивандальные' />
        <h3>Антивандальные</h3>
        <p>Обоям не страшны механические повреждения, в том числе и ногти домашних животных</p>
      </div>
      <div className='feature'>
        <img src='/images/3block_bacteria.png' alt='Гипоаллергенные' />
        <h3>Гипоаллергенные</h3>
        <p>Обои не вызывают аллергию и сохраняют баланс влажности в помещении</p>
      </div>
      <div className='feature'>
        <img src='/images/3block_listik.png' alt='Экологичные' />
        <h3>Экологичные</h3>
        <p>Обои на 100% состоят из натуральных природных материалов</p>
      </div>
      <div className='feature'>
        <img src='/images/3block_water.png' alt='Можно мыть' />
        <h3>Можно мыть</h3>
        <p>
          Обои не только можно мыть с чистящими средствами, но и использовать их в помещениях с
          повышенной влажностью
        </p>
      </div>
    </div>
  );
};

export default Features;
