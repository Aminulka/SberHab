import React from 'react';
import '../styles/features.css';
import list from '../assets/3block_bacteria.png';
import energo from '../assets/3block_energy.png';
import lapa from '../assets/3block_lapa.png';
import eko from '../assets/3block_listik.png';
import water from '../assets/3block_water.png';

const Features: React.FC = () => {
  return (
    <div className='features'>
      <div className='feature'>
        <img src={lapa} alt='Антивандальные' />
        <h3>Антивандальные</h3>
        <p>Обоям не страшны механические повреждения, в том числе и когти домашних животных</p>
      </div>
      <div className='feature'>
        <img src={list} alt='Listok' />
        <h3>Гипоаллергенные</h3>
        <p>Обои не вызывают аллергию и сохраняют баланс влажности в помещении</p>
      </div>
      <div className='feature'>
        <img src={eko} alt='Экологичные' />
        <h3>Экологичные</h3>
        <p>Обои на 100% состоят из натуральных природных материалов</p>
      </div>
      <div className='feature'>
        <img src={energo} alt='Защищают от трещин' />
        <h3>Защищают от трещин</h3>
        <p>
          Обои отлично сдерживают образование трещин на стенах и идеально подходят для новостроек
        </p>
      </div>
      <div className='feature'>
        <img src={water} alt='Можно мыть' />
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
