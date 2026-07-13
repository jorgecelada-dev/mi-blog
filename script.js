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