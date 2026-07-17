// script.js

// --- 1. Reveal al hacer scroll ---
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// --- 2. Menú hamburguesa (móvil) ---
const burger = document.getElementById('topbar-burger');
const links = document.getElementById('topbar-links');

if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('abierto');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('abierto');
    });
  });
}
