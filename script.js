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

// --- 3. Filtro de categorías ---
const botones = document.querySelectorAll('.index-item');
const piezas = document.querySelectorAll('.pieza');

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    // Quita "active" de todos, se lo pone al clicado
    botones.forEach((b) => b.classList.remove('active'));
    boton.classList.add('active');

    const filtro = boton.dataset.filter;

    piezas.forEach((pieza) => {
      const coincide = filtro === 'todo' || pieza.dataset.cat === filtro;
      pieza.classList.toggle('oculto', !coincide);
    });
  });
});