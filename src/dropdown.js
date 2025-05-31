document.querySelector('.dropdown-toggle').addEventListener('click', () => {
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach((d) => d.classList.remove('open'));
  }
});
