import React, { useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import './how-to-paint.css';
import Lines from '../../assets/Group 50.svg';
import VideoPhone from '../../assets/slides/slider1.jpg';
import Breadcrumbs from '../../components/Breadcrumbs';

const HowToPaint: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const youtubeVideoId = 'Lmv5BMXfFfg';

  return (
    <main className='how-to-paint-page'>
      <section className='video-section'>
        <Breadcrumbs currentPage='Как красить обои BauTex Design' />
        <h1 className='page-title'>Как красить обои BauTex Design</h1>
        <div className={`video-container ${isPlaying ? 'playing' : ''}`}>
          <VideoPlayer videoId={youtubeVideoId} onPlay={handlePlayClick} isPlaying={isPlaying} />
          {!isPlaying && (
            <>
              <div className='video-preview'>
                <img src={VideoPhone} alt={'Превью видео'} />
              </div>
              <button
                className='play-button'
                onClick={handlePlayClick}
                type='button'
                aria-label='Воспроизвести видео'
              />
              <div className='svg-overlay'>
                <Lines className="lines-svg" />
              </div>
            </>
          )}
        </div>
      </section>

      <div className='how-to-paint-content-container'>
        <div className='how-to-paint-content-wrapper'>
          <div className='how-to-paint-section'>
            <h2 className='how-to-paint-section-title'>1. Подготовка к покраске</h2>
            <div className='how-to-paint-section-text'>
              <p>
                Перед началом покраски убедитесь, что обои полностью высохли после поклейки (минимум
                24 часа).
              </p>

              <h3 className='how-to-paint-subtitle'>Рекомендуемые материалы:</h3>
              <ul className='how-to-paint-list'>
                <li>Акриловые краски</li>
                <li>Латексные краски</li>
                <li>Водно-дисперсионные краски</li>
              </ul>

              <div className='how-to-paint-warning'>
                <strong>Важно!</strong> Не используйте масляные краски и алкидные эмали - они могут
                повредить структуру обоев.
              </div>

              <h3 className='how-to-paint-subtitle'>Необходимые инструменты:</h3>
              <ul className='how-to-paint-list'>
                <li>Валик с термоплавленным ворсом</li>
                <li>Кисть для прокрашивания углов и стыков</li>
                <li>Малярный скотч</li>
                <li>Лоток для краски</li>
                <li>Защитная пленка для пола</li>
              </ul>
            </div>
          </div>

          <div className='how-to-paint-section'>
            <h2 className='how-to-paint-section-title green'>2. Процесс покраски</h2>
            <div className='how-to-paint-section-text'>
              <ol className='how-to-paint-steps'>
                <li>Защитите плинтусы и прилегающие поверхности малярным скотчем.</li>
                <li>
                  Тщательно перемешайте краску. Если краска слишком густая, разбавьте её согласно
                  инструкции производителя.
                </li>
                <li>
                  Начинайте красить от угла комнаты, двигаясь сверху вниз:
                  <ul className='how-to-paint-sublist'>
                    <li>Нанесите краску валиком W-образными движениями</li>
                    <li>Распределите краску равномерно, не оставляя подтеков</li>
                    <li>
                      Следите за тем, чтобы стык между окрашенными участками не успевал высохнуть
                    </li>
                  </ul>
                </li>
                <li>Прокрасьте углы и стыки кистью.</li>
              </ol>

              <div className='how-to-paint-tip'>
                <strong>Совет!</strong> Не экономьте на краске - слишком тонкий слой может не дать
                желаемого результата. При этом не наносите слишком толстый слой, чтобы избежать
                потеков.
              </div>
            </div>
          </div>

          <div className='how-to-paint-section'>
            <h2 className='how-to-paint-section-title green'>3. Финальные штрихи</h2>
            <div className='how-to-paint-section-text'>
              <ol className='how-to-paint-steps'>
                <li>
                  После полного высыхания первого слоя оцените результат:
                  <ul className='how-to-paint-sublist'>
                    <li>Если цвет недостаточно насыщенный</li>
                    <li>Если есть непрокрашенные участки</li>
                    <li>Если покрытие неравномерное</li>
                  </ul>
                  В этих случаях нанесите второй слой краски.
                </li>
                <li>
                  Второй слой наносите перпендикулярно первому для более равномерного покрытия.
                </li>
                <li>
                  После окончания покраски сразу удалите малярный скотч - это предотвратит
                  отслаивание краски вместе с лентой.
                </li>
              </ol>

              <div className='how-to-paint-tip'>
                <strong>Совет!</strong> Сохраните небольшое количество использованной краски для
                возможных подкрашиваний в будущем.
              </div>
            </div>
          </div>

          <div className='how-to-paint-final-note'>
            <h3>Поздравляем!</h3>
            <p>
              Теперь ваши стены выглядят безупречно. Дайте краске полностью высохнуть в течение 24
              часов, избегая сквозняков и прямых солнечных лучей.
            </p>
            <p>
              После полного высыхания ваши обои будут радовать вас своим превосходным внешним видом
              долгие годы.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HowToPaint;