// script.js

// --- 1. Animación de letras en el <h1> ---
document.querySelectorAll('.animar-letras').forEach((el) => {
  const texto = el.textContent;
  el.textContent = '';
  [...texto].forEach((letra, i) => {
    const span = document.createElement('span');
    span.textContent = letra === ' ' ? '\u00A0' : letra;
    span.style.animationDelay = `${i * 0.04}s`;
    el.appendChild(span);
  });
});

// --- 2. Reveal al hacer scroll ---
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// --- 3. Menú hamburguesa (móvil) ---
const burger = document.getElementById('topbar-burger');
const links = document.getElementById('topbar-links');

if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('abierto');
  });
}

// --- 4. Filtro desde la topbar ---
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