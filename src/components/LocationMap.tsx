import React, { useState, useEffect, useRef } from 'react';
import '../styles/location-map.css';
import ymaps from 'yandex-maps';

// Типы для Карт
declare global {
  interface Window {
    ymaps: typeof ymaps;
  }
}

interface Location {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
}

const locations: Location[] = [
  {
    id: 1,
    name: 'BauTex Design - Главный офис',
    address: 'г. Владимир, ул. Большая Нижегородская, 88',
    coordinates: [56.129057, 40.406662],
  },
  {
    id: 2,
    name: 'Салон BauTex Design',
    address: 'г. Москва, ул. Нижняя Сыромятническая, д. 10, стр. 2, 2 этаж',
    coordinates: [55.752121, 37.670355],
  },
  {
    id: 3,
    name: 'Дилерский центр BauTex',
    address: 'г. Санкт-Петербург, ул. Большая Конюшенная, д. 19',
    coordinates: [59.939864, 30.323853],
  },
];

const LocationMap: React.FC = () => {
  const [viewType, setViewType] = useState<'map' | 'list'>('map');
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<ymaps.Map | null>(null);
  const placemarksRef = useRef<ymaps.Placemark[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const highlightPlacemark = (locationId: number) => {
    if (!mapRef.current || !placemarksRef.current.length) return;
    // Сбрасываем все метки к зеленому цвету
    placemarksRef.current.forEach((placemark) => {
      placemark.options.set('preset', 'islands#greenDotIcon');
    });

    const locationIndex = locations.findIndex((loc) => loc.id === locationId);
    if (locationIndex === -1) return;

    const placemark = placemarksRef.current[locationIndex];
    placemark.options.set('preset', 'islands#greenIcon');
    placemark.balloon.open();
    mapRef.current.setCenter(locations[locationIndex].coordinates, 16, {
      duration: 500,
    });
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainerRef.current || viewType !== 'map') return;

      try {
        setIsLoading(true);

        if (!window.ymaps) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_ключ&lang=ru_RU';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        await window.ymaps.ready();

        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: [55.76, 37.64],
          zoom: 5,
          controls: ['zoomControl'],
        });

        placemarksRef.current = locations.map((location) => {
          const placemark = new window.ymaps.Placemark(
            location.coordinates,
            {
              balloonContent: `
                <div class="balloon">
                  <h3>${location.name}</h3>
                  <p>${location.address}</p>
                </div>
              `,
            },
            {
              preset: 'islands#greenDotIcon',
            }
          );
          map.geoObjects.add(placemark);
          return placemark;
        });

        const bounds = map.geoObjects.getBounds();
        if (bounds) {
          map.setBounds(bounds, {
            checkZoomRange: true,
            zoomMargin: [50, 50, 50, 50],
          });
        } else {
          map.setCenter([55.76, 37.64], 5);
        }

        mapRef.current = map;
        setIsLoading(false);

        if (activeLocation) {
          highlightPlacemark(activeLocation);
        }
      } catch (err) {
        console.error('Map error:', err);
        setError('Ошибка загрузки карты');
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
        placemarksRef.current = [];
      }
    };
  }, [viewType, activeLocation]);

  const handleLocationClick = (location: Location) => {
    setActiveLocation(location.id);
    setViewType('map');
  };

  return (
    <section className='location-section'>
      <div className='location-header'>
        <h1 className='location-title'>Где нас можно купить</h1>
      </div>

      <div className='view-toggle-buttons'>
        <button
          className={`view-toggle-button ${viewType === 'map' ? 'active' : ''}`}
          onClick={() => setViewType('map')}
        >
          Карта
        </button>
        <button
          className={`view-toggle-button ${viewType === 'list' ? 'active' : ''}`}
          onClick={() => setViewType('list')}
        >
          Список
        </button>
      </div>

      <div className='location-content'>
        {viewType === 'map' ? (
          <div className='map-wrapper'>
            <div ref={mapContainerRef} className='map-container' />
            {isLoading && <div className='map-loading'>Загрузка карты...</div>}
            {error && <div className='map-error'>{error}</div>}
          </div>
        ) : (
          <div className='locations-list'>
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-item ${activeLocation === location.id ? 'active' : ''}`}
                onClick={() => void handleLocationClick(location)}
              >
                <h3>{location.name}</h3>
                <p>{location.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationMap;
