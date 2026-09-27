/* ==========================================================================
   NewsWave - layout.js
   Comportamiento comun a todas las paginas: menu responsivo, marcado de la
   seccion activa, buscador del encabezado y año del pie de pagina.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --- Menu responsivo -------------------------------------------------- */
  var boton = document.querySelector('.boton-menu');
  var menu = document.querySelector('.menu');

  if (boton && menu) {
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }

  /* --- Seccion activa del menu ------------------------------------------ */
  var pagina = window.location.pathname.split('/').pop() || 'index.html';
  var enlaces = document.querySelectorAll('.menu a');

  for (var i = 0; i < enlaces.length; i++) {
    if (enlaces[i].getAttribute('href') === pagina) {
      enlaces[i].classList.add('activo');
    }
  }

  /* --- Buscador del encabezado ------------------------------------------ */
  var formularioBusqueda = document.querySelector('.buscador-cabecera');

  if (formularioBusqueda) {
    formularioBusqueda.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var texto = formularioBusqueda.querySelector('input').value.trim();
      window.location.href = 'noticias.html' + (texto ? '?q=' + encodeURIComponent(texto) : '');
    });
  }

  /* --- Boton de favorito -------------------------------------------------
     Por ahora solo cambia el estado visual del boton. El almacenamiento de
     la lista en el navegador (localStorage) corresponde al siguiente punto
     de la entrega.                                                          */
  document.addEventListener('click', function (evento) {
    var boton = evento.target.closest('.boton-favorito');
    if (!boton) { return; }

    var activo = boton.classList.toggle('activo');
    boton.innerHTML = activo ? '&#9733;' : '&#9734;';
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
  });

  /* --- Fecha del dia en la barra superior y año en el pie --------------- */
  var hoy = new Date();
  var fecha = document.querySelector('[data-fecha-hoy]');

  if (fecha) {
    fecha.textContent = hoy.toLocaleDateString('es-CO', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  var anio = document.querySelector('[data-anio]');
  if (anio) {
    anio.textContent = hoy.getFullYear();
  }
});
