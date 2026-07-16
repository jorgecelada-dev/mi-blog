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
}

// --- 3. Filtro desde la topbar ---
document.querySelectorAll('.topbar-links a[data-filter]').forEach((link) => {
  link.addEventListener('click', () => {
    const filtro = link.dataset.filter;
    document.querySelectorAll('.pieza').forEach((pieza) => {
      const coincide = pieza.dataset.cat === filtro;
      pieza.classList.toggle('oculto', !coincide);
    });
    if (links) links.classList.remove('abierto');
  });
});
