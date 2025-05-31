document.addEventListener('DOMContentLoaded', () => {
  // Переключение между типами тканей
  const fabricTypes = document.querySelectorAll('.fabric-type');
  fabricTypes.forEach((type) => {
    type.addEventListener('click', () => {
      fabricTypes.forEach((t) => t.classList.remove('active'));
      type.classList.add('active');
      // Здесь можно добавить загрузку соответствующих миниатюр
    });
  });

  // Выбор ткани из миниатюр
  const fabricThumbs = document.querySelectorAll('.fabric-thumb');
  fabricThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      fabricThumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      const imgSrc = thumb.getAttribute('data-img');
      document.getElementById('mainFabric').src = imgSrc;
    });
  });

  // Выбор цвета
  const colorCircles = document.querySelectorAll('.color-circle');
  colorCircles.forEach((circle) => {
    circle.addEventListener('click', () => {
      const color = circle.getAttribute('data-color');
      document.getElementById('colorOverlay').style.backgroundColor = color;
    });
  });
});
