import React, { useState } from 'react';
import '../styles/fabrics.css';
// Basic
import texture1 from '../assets/fabrics/basic/texture1.jpg';
import texture2 from '../assets/fabrics/basic/texture2.jpg';

// Loft
import loft1 from '../assets/fabrics/loft/texture3.jpg';
import loft2 from '../assets/fabrics/loft/texture4.jpg';

interface FabricType {
  name: string;
  items: Array<{
    id: number;
    name: string;
    description: string;
    images: string[];
  }>;
}

const FabricsSection: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeColor, setActiveColor] = useState('');
  const [colorIntensity, setColorIntensity] = useState(0.6);

  const fabricTypes: FabricType[] = [
    {
      name: 'Basic',
      items: [
        {
          id: 1,
          name: 'Классическая текстура',
          description: 'Элегантная базовая текстура с тонким рельефным узором',
          images: [texture1],
        },
        {
          id: 2,
          name: 'Современный минимализм',
          description: 'Строгая геометрическая текстура для современных интерьеров',
          images: [texture2],
        },
      ],
    },
    {
      name: 'Loft',
      items: [
        {
          id: 3,
          name: 'Индустриальный стиль',
          description: 'Грубая текстура с эффектом состаренности',
          images: [loft1],
        },
        {
          id: 4,
          name: 'Урбанистический паттерн',
          description: 'Современная текстура с индустриальными мотивами',
          images: [loft2],
        },
      ],
    },
  ];

  const colors = [
    { name: 'Белый', hex: '#FFFFFF', intensity: 0.3 },
    { name: 'Кремовый', hex: '#F5E6D3', intensity: 0.4 },
    { name: 'Песочный', hex: '#E6C5A0', intensity: 0.5 },
    { name: 'Серый', hex: '#808080', intensity: 0.6 },
    { name: 'Зеленый', hex: '#4A614D', intensity: 0.7 },
    { name: 'Синий', hex: '#2B4C7E', intensity: 0.7 },
    { name: 'Бордовый', hex: '#722F37', intensity: 0.8 },
    { name: 'Черный', hex: '#000000', intensity: 0.9 },
  ];

  const getActiveType = () => {
    return fabricTypes
      .find((type) => type.items.some((item) => item.id === activeItemId))
      ?.name.toLowerCase();
  };

  const getActiveItem = () => {
    const activeTypeData = fabricTypes.find((type) =>
      type.items.some((item) => item.id === activeItemId)
    );
    return activeTypeData?.items.find((item) => item.id === activeItemId);
  };

  const handleColorClick = (color: string, intensity: number) => {
    setActiveColor(color);
    setColorIntensity(intensity);
  };

  return (
    <div className='fabrics-section'>
      <div className='container'>
        <h2>Подберите ткань под ваш стиль</h2>

        <div className='fabrics-content'>
          <div className='fabrics-types'>
            {fabricTypes.map((type) => (
              <div
                key={type.name}
                className={`fabric-type ${getActiveType() === type.name.toLowerCase() ? 'active' : ''}`}
              >
                <h3>{type.name}</h3>
                <div className='fabric-items-grid'>
                  {type.items.map((item) => (
                    <div
                      key={item.id}
                      className={`fabric-item ${activeItemId === item.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItemId(item.id);
                        setActiveImageIndex(0);
                        setActiveColor('');
                      }}
                    >
                      <div className='fabric-item-preview'>
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      <span className='fabric-item-name'>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='fabrics-preview'>
            <div className='main-fabric-view'>
              {getActiveItem() && (
                <>
                  <img
                    src={getActiveItem()?.images[activeImageIndex]}
                    alt='Выбранная ткань'
                    className='fabric-image'
                  />
                  <div
                    className='color-overlay'
                    style={{
                      backgroundColor: activeColor,
                      opacity: activeColor ? colorIntensity : 0,
                      mixBlendMode: 'multiply',
                    }}
                  />
                </>
              )}
            </div>

            <div className='color-palette'>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-circle ${activeColor === color.hex ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorClick(color.hex, color.intensity)}
                >
                  <span className='color-name'>{color.name}</span>
                </div>
              ))}
            </div>

            <div className='fabric-info'>
              <h3>{getActiveItem()?.name}</h3>
              <p>{getActiveItem()?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricsSection;
