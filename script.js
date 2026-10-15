const loader = document.querySelector('.loader');
const loaderCount = document.querySelector('[data-loader-count]');
let count = 0;

const loadTimer = setInterval(() => {
  count = Math.min(100, count + Math.ceil(Math.random() * 14));
  loaderCount.textContent = String(count).padStart(2, '0');
  if (count === 100) {
    clearInterval(loadTimer);
    setTimeout(() => loader.classList.add('done'), 180);
  }
}, 60);

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const orbitCopy = document.querySelector('.orbit-copy');
orbitCopy.innerHTML = orbitCopy.textContent.split('').map((character, index, all) => {
  const angle = (index / all.length) * 360;
  return `<i style="position:absolute;left:50%;top:50%;font-style:normal;transform:rotate(${angle}deg) translateY(-6.9vw);transform-origin:0 0">${character}</i>`;
}).join('');

if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.18;
      const y = (event.clientY - box.top - box.height / 2) * 0.18;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}
