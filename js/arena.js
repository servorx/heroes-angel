document.addEventListener('DOMContentLoaded', () => {
  const personajesSeleccionados = JSON.parse(localStorage.getItem('personajesSeleccionados')) || [];

  fetch('http://localhost:3000/personajes')
    .then(res => res.json())
    .then(data => {
      const heroes = data.heroes;

      // Mapear modos de combate a IDs de personajes
      const modoCombates = [
        {
          jugador1: personajesSeleccionados[0],
          jugador2: personajesSeleccionados[1],
          container: document.getElementById('combate-1')
        },
        {
          jugador1: personajesSeleccionados[0],
          jugador2: 'bot',
          container: document.getElementById('combate-2')
        },
        {
          jugador1: 'bot',
          jugador2: 'bot',
          container: document.getElementById('combate-3')
        }
      ];

      modoCombates.forEach(modo => {
        const heroe1 = modo.jugador1 === 'bot'
          ? crearBot()
          : heroes.find(h => h.id === modo.jugador1);

        const heroe2 = modo.jugador2 === 'bot'
          ? crearBot()
          : heroes.find(h => h.id === modo.jugador2);

        renderizarPelea(modo.container, heroe1, heroe2);
      });
    })
    .catch(error => {
      console.error('Error al cargar los héroes:', error);
    });

  function renderizarPelea(contenedor, heroe1, heroe2) {
    const imgs = contenedor.querySelectorAll('.imagen img');
    imgs[0].src = heroe1.imagen || '../assets/img/IA.jpg';
    imgs[0].alt = heroe1.nombreClave || 'BOT';
    imgs[1].src = heroe2.imagen || '../assets/img/IA.jpg';
    imgs[1].alt = heroe2.nombreClave || 'BOT';

    const headers = contenedor.querySelectorAll('h2');
    headers[0].textContent = heroe1.nombreClave || 'BOT';
    headers[1].textContent = heroe2.nombreClave || 'BOT';
  }

  function crearBot() {
    const bots = [
      {
        nombre: 'Ultron',
        nombreClave: 'BOT-01',
        imagen: '../assets/img/IA.jpg',
        poder: randomStat(),
        velocidad: randomStat(),
        inteligencia: randomStat(),
        habilidadCombate: randomStat()
      },
      {
        nombre: 'Brainiac',
        nombreClave: 'BOT-02',
        imagen: '../assets/img/IA.jpg',
        poder: randomStat(),
        velocidad: randomStat(),
        inteligencia: randomStat(),
        habilidadCombate: randomStat()
      }
    ];
    return bots[Math.floor(Math.random() * bots.length)];
  }

  function randomStat() {
    return Math.floor(Math.random() * 100) + 1;
  }
});


// apartir de aca viene el js de la parte de escoger los heroes
let heroesDisponibles = [];

document.querySelectorAll('.pelea').forEach(pelea => {
  pelea.addEventListener('click', () => {
    document.getElementById('modal-combate').classList.remove('oculto');
    cargarTarjetas();
  });
});

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-combate').classList.add('oculto');
});

function cargarTarjetas() {
  fetch('http://localhost:3000/personajes')
    .then(res => res.json())
    .then(data => {
      heroesDisponibles = data.heroes;

      const cont1 = document.getElementById('tarjetas-jugador1');
      const cont2 = document.getElementById('tarjetas-jugador2');
      cont1.innerHTML = '';
      cont2.innerHTML = '';

      heroesDisponibles.forEach(hero => {
        const card = crearTarjeta(hero);
        const card2 = crearTarjeta(hero);

        card.addEventListener('click', () => seleccionarHeroe(1, hero.id));
        card2.addEventListener('click', () => seleccionarHeroe(2, hero.id));

        cont1.appendChild(card);
        cont2.appendChild(card2);
      });
    });
}

function crearTarjeta(hero) {
  const div = document.createElement('div');
  div.className = 'tarjeta-hero';
  div.innerHTML = `<img src="${hero.imagen}" alt="${hero.nombreClave}" title="${hero.nombreClave}">`;
  return div;
}

let seleccionados = {
  1: null,
  2: null
};

function seleccionarHeroe(jugador, id) {
  seleccionados[jugador] = id;
  console.log(`Jugador ${jugador} seleccionó al héroe con ID: ${id}`);
}

document.querySelectorAll('.btn-aleatorio').forEach(btn => {
  btn.addEventListener('click', () => {
    const jugador = btn.dataset.jugador;
    const randomHero = heroesDisponibles[Math.floor(Math.random() * heroesDisponibles.length)];
    seleccionarHeroe(jugador, randomHero.id);
    alert(`Jugador ${jugador} seleccionó aleatoriamente: ${randomHero.nombreClave}`);
  });
});

document.getElementById('btn-comenzar-pelea').addEventListener('click', () => {
  if (!seleccionados[1] || !seleccionados[2]) {
    alert('Debes seleccionar un héroe para cada jugador.');
    return;
  }
  localStorage.setItem('personajesSeleccionados', JSON.stringify([seleccionados[1], seleccionados[2]]));
  window.location.reload();
});
