// import { CartasDc, CartasMarvel } from "./cards";

class arenaGamemode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const templateNombre = /* HTML */ `
      <style>
        /* contenedor principal de escoger el modo de batalla*/
        .contenedor-arena {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 2rem;
          margin-top: 3rem;
          margin: 8rem;
        }

        /* estilo por cada modo de pelea */
        .pelea {
          position: relative;
          width: 20rem;
          background: linear-gradient(145deg, #1e1e1e, #2c2c2c);
          border: 3px solid #ff3131;
          border-radius: 15px;
          padding: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 0 10px #ff3131;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* crear un estilo para cuando se hace hover al container */
        .pelea:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px #ff6b6b;
        }

        /* Títulos de jugador */
        .pelea h2 {
          font-size: 1.8rem;
          margin: 2rem 0 2rem;
          color: #ffe600;
          text-shadow: 1px 1px 4px #000;
        }

        /* Imagen de los jugadores y sus estilos */
        .imagen {
          width: 100%;
          height: 20rem;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          border: 2px solid #ffe600;
        }

        .imagen img {
          width: 100%;
          object-fit: cover;
          filter: contrast(1.1) brightness(1.1);
          transition: transform 0.4s ease;
        }

        .imagen:hover img {
          transform: scale(1.1);
        }

        /* estilos de versus */
        .vs {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }

        /* Texto central con efecto fuego */
        .texto-fuego {
          font-size: 3.5rem;
          color: #ff3c00;
          font-weight: bold;
          text-shadow: 0 0 5px #ff6600;
          animation: flame 1.2s infinite alternate;
        }

        /* efecto del flame para el texto del versus */
        @keyframes flame {
          0% { text-shadow: 0 0 5px #ff6600, 0 0 10px #ff3300, 0 0 15px #ff0000; }
          100% { text-shadow: 0 0 10px #ff9933, 0 0 20px #ff3300, 0 0 25px #ff0000; }
        }

        /* Responsive para móviles */
        @media (max-width: 768px) {
          .contenedor-arena {
            flex-direction: column;
            align-items: center;
          }

          .pelea {
            width: 90%;
          }
        }
      </style>
      <div class="contenedor-arena">
        <div class="pelea" id="combate-1">
          <h2>Jugador 1</h2>
          <div class="imagen" id="img-jugador1">
            <img src="../assets/img/player.jpg" width="900rem" alt="player image">
          </div>

          <span class="vs"><div class="texto-fuego">VS</div></span>

          <h2>Jugador 2</h2>
          <div class="imagen" id="img-jugador2">
            <img src="../assets/img/player.jpg" alt="player image">
          </div>
        </div>
        <div class="pelea" id="combate-2">
          <h2>Jugador 1</h2>
          <div class="imagen" id="img-jugador1">
            <img src="../assets/img/player.jpg" width="900rem" alt="player image">
          </div>

          <span class="vs"><div class="texto-fuego">VS</div></span>

          <h2>BOT</h2>
          <div class="imagen" id="img-jugador2">
            <img src="../assets/img/IA.jpg" alt="IA image">
          </div>
        </div>
        <div class="pelea" id="combate-3">
          <h2>BOT</h2>
          <div class="imagen" id="img-jugador1">
            <img src="../assets/img/IA.jpg" alt="IA image">
          </div>

          <span class="vs"><div class="texto-fuego">VS</div></span>

          <h2>BOT</h2>
          <div class="imagen" id="img-jugador2">
            <img src="../assets/img/IA.jpg" alt="IA image">
          </div>
        </div>
      </div> 
    `;

    this.shadowRoot.innerHTML = templateNombre;

    this.shadowRoot.querySelectorAll('.pelea').forEach(carta => {
      carta.addEventListener('click', () => {
        const modal = document.querySelector('modal-seleccion');
        if (modal && typeof modal.open === 'function') {
          modal.open();
        } else {
          console.error('No se encontró el modal o no tiene método open.');
        }
      });
    });
  }
}

customElements.define("arena-gamemode-modal", arenaGamemode);


class modalSeleccionPersonaje extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = /* HTML */ `
      <style>
        .modal {
          display: flex;
          position: fixed;
          z-index: 999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.8);
          justify-content: center;
          align-items: center;
        }

        .modal.oculto {
          display: none;
        }

        .modal-content {
          background: #222;
          border: 2px solid #ffe600;
          box-shadow: 0 0 15px #ff3131;
          padding: 2rem;
          border-radius: 15px;
          color: #fff;
          text-align: center;
          width: 80%;
          max-width: 900px;
          animation: aparecer 0.3s ease;
          text-align: center;
        }

        .modal-content .jugador-seleccion {
          width: 45%;
          display: inline-block;
          vertical-align: top;
        }

        .close {
          float: right;
          color: #ccc;
          font-size: 3rem;
          cursor: pointer;
        }

        .tarjetas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 1rem 0;
        }

        .tarjeta-hero {
          border: 2px solid #ff3131;
          padding: 0.5rem;
          border-radius: 10px;
          cursor: pointer;
          width: 100px;
          transition: transform 0.2s ease;
        }

        .tarjeta-hero:hover {
          transform: scale(1.1);
          box-shadow: 0 0 10px #ff3131;
        }

        .tarjeta-hero img {
          width: 100%;
          border-radius: 5px;
        }

        .btn-aleatorio,
        #btn-comenzar-pelea {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #ff3131;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        @keyframes aparecer {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        /* estos son estilos para las cartas por lo que las clases no se van a encotnrar en este archivo, se encuentran en los dise;os de cards.js */
        .card.seleccionada {
          transform: scale(1);
          box-shadow: 0 0 15px 5px #00ffcc;
          cursor: default;
        }

        .card:not(.seleccionada):hover {
          transform: translateY(-10px) scale(1.03) rotateZ(1deg);
          box-shadow: 0 12px 24px rgba(255, 65, 54, 0.6), 0 12px 24px rgba(255, 0, 0, 0.4);
        }

      </style>
      <div id="modal-combate" class="modal oculto">
        <div class="modal-content">
          <span class="close" id="cerrar-modal">&times;</span>
          <h2>Selecciona tus personajes</h2>
          <div class="seleccion-jugadores">
            <div class="jugador-seleccion" id="jugador1">
              <h3>Jugador 1</h3>
              <slot class="tarjetas" id="tarjetas-jugador1"></slot>
              <button class="btn-aleatorio" data-jugador="1">Aleatorio</button>
            </div>
            <div class="jugador-seleccion" id="jugador2">
              <h3>Jugador 2</h3>
              <slot class="tarjetas" id="tarjetas-jugador2"></slot>
              <button class="btn-aleatorio" data-jugador="2">Aleatorio</button>
            </div>
          </div>
            <button id="btn-comenzar-pelea">¡Comenzar Pelea!</button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = template;

    this.modal = this.shadowRoot.getElementById('modal-combate');
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.close());

    // para que cuando el usuario le de click en el boton de x se salga del modal
    this.shadowRoot.querySelectorAll('.pelea').forEach(card => {
      card.addEventListener('click', () => {
        const modal = document.getElementById('modalSeleccion');
        if (modal && typeof modal.open === 'function') {
          modal.open();
        }
      });
    });
    // Cierra el modal si se hace clic fuera del contenido
    this.shadowRoot.querySelector('.modal').addEventListener('click', (event) => {
      const modalContent = this.shadowRoot.querySelector('.modal-content');
      if (!modalContent.contains(event.target)) {
        this.close();
      }
    });
    // para que se pueda cerrar con la tecla Escape
    this._handleEscape = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this._handleEscape);

    this.addEventListener('carta-seleccionada', (event) => {
      const nombre = event.detail.nombreClave;

      if (!this.jugador1) {
        this.jugador1 = nombre;
      } else if (!this.jugador2 && this.jugador1 !== nombre) {
        this.jugador2 = nombre;
      }

      if (this.jugador1 && this.jugador2) {
        this.dispatchEvent(new CustomEvent('jugadores-listos', {
          detail: {
            jugador1: this.jugador1,
            jugador2: this.jugador2
          },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  open() {
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
  }
}

customElements.define('modal-seleccion', modalSeleccionPersonaje);





// document.addEventListener('DOMContentLoaded', () => {
//   const personajesSeleccionados = JSON.parse(localStorage.getItem('personajesSeleccionados')) || [];

//   fetch('http://localhost:3000/personajes')
//     .then(res => res.json())
//     .then(data => {
//       const heroes = data.heroes;

//       const modoCombates = [
//         {
//           jugador1: personajesSeleccionados[0],
//           jugador2: personajesSeleccionados[1],
//           container: document.getElementById('combate-1')
//         },
//         {
//           jugador1: personajesSeleccionados[0],
//           jugador2: 'bot',
//           container: document.getElementById('combate-2')
//         },
//         {
//           jugador1: 'bot',
//           jugador2: 'bot',
//           container: document.getElementById('combate-3')
//         }
//       ];

//       modoCombates.forEach(modo => {
//         const heroe1 = modo.jugador1 === 'bot' ? crearBot() : heroes.find(h => h.id === modo.jugador1);
//         const heroe2 = modo.jugador2 === 'bot' ? crearBot() : heroes.find(h => h.id === modo.jugador2);
//         renderizarPelea(modo.container, heroe1, heroe2);
//       });
//     })
//     .catch(error => {
//       console.error('Error al cargar los héroes:', error);
//     });

//   function renderizarPelea(contenedor, heroe1, heroe2) {
//     const imgs = contenedor.querySelectorAll('.imagen img');
//     const headers = contenedor.querySelectorAll('h2');

//     if (imgs.length === 2 && headers.length === 2) {
//       imgs[0].src = heroe1?.imagen || '../assets/img/IA.jpg';
//       imgs[0].alt = heroe1?.nombreClave || 'BOT';
//       headers[0].textContent = heroe1?.nombreClave || 'BOT';

//       imgs[1].src = heroe2?.imagen || '../assets/img/IA.jpg';
//       imgs[1].alt = heroe2?.nombreClave || 'BOT';
//       headers[1].textContent = heroe2?.nombreClave || 'BOT';
//     }
//   }

//   function crearBot() {
//     const bots = [
//       {
//         nombre: 'Ultron',
//         nombreClave: 'BOT-01',
//         imagen: '../assets/img/IA.jpg',
//         poder: randomStat(),
//         velocidad: randomStat(),
//         inteligencia: randomStat(),
//         habilidadCombate: randomStat()
//       },
//       {
//         nombre: 'Brainiac',
//         nombreClave: 'BOT-02',
//         imagen: '../assets/img/IA.jpg',
//         poder: randomStat(),
//         velocidad: randomStat(),
//         inteligencia: randomStat(),
//         habilidadCombate: randomStat()
//       }
//     ];
//     return bots[Math.floor(Math.random() * bots.length)];
//   }

//   function randomStat() {
//     return Math.floor(Math.random() * 100) + 1;
//   }
// });

// // Lógica para el modal y selección de personajes
// let heroesDisponibles = [];

// document.querySelectorAll('.pelea').forEach(pelea => {
//   pelea.addEventListener('click', () => {
//     document.getElementById('modal-batalla').classList.remove('oculto');
//     cargarTarjetas();
//   });
// });

// document.getElementById('cerrar-modal-batalla').addEventListener('click', () => {
//   document.getElementById('modal-combate').classList.add('oculto');
// });

// function cargarTarjetas() {
//   fetch('http://localhost:3000/personajes')
//     .then(res => res.json())
//     .then(data => {
//       heroesDisponibles = data.heroes;

//       const cont1 = document.getElementById('tarjetas-jugador1');
//       const cont2 = document.getElementById('tarjetas-jugador2');
//       cont1.innerHTML = '';
//       cont2.innerHTML = '';

//       heroesDisponibles.forEach(hero => {
//         const card = crearTarjeta(hero);
//         const card2 = crearTarjeta(hero);

//         card.addEventListener('click', () => seleccionarHeroe(1, hero.id));
//         card2.addEventListener('click', () => seleccionarHeroe(2, hero.id));

//         cont1.appendChild(card);
//         cont2.appendChild(card2);
//       });
//     });
// }

// function crearTarjeta(hero) {
//   const div = document.createElement('div');
//   div.className = 'tarjeta-hero';
//   div.innerHTML = `<img src="${hero.imagen}" alt="${hero.nombreClave}" title="${hero.nombreClave}">`;
//   return div;
// }

// let seleccionados = {
//   1: null,
//   2: null
// };

// function seleccionarHeroe(jugador, id) {
//   seleccionados[jugador] = id;
//   console.log(`Jugador ${jugador} seleccionó al héroe con ID: ${id}`);
// }

// document.querySelectorAll('.btn-aleatorio').forEach(btn => {
//   btn.addEventListener('click', () => {
//     const jugador = btn.dataset.jugador;
//     const randomHero = heroesDisponibles[Math.floor(Math.random() * heroesDisponibles.length)];
//     seleccionarHeroe(jugador, randomHero.id);
//     alert(`Jugador ${jugador} seleccionó aleatoriamente: ${randomHero.nombreClave}`);
//   });
// });

// document.getElementById('btn-comenzar-pelea').addEventListener('click', () => {
//   if (!seleccionados[1] || !seleccionados[2]) {
//     alert('Debes seleccionar un héroe para cada jugador.');
//     return;
//   }
//   localStorage.setItem('personajesSeleccionados', JSON.stringify([seleccionados[1], seleccionados[2]]));
//   window.location.reload();
// });







// const ruta_JSON = "./data/db.json";

// document.addEventListener("DOMContentLoaded", () => {
  
//   // Agregar atributos completos a los personajes desde el archivo db.json
//   fetch("http://localhost:3000/personajes")
//     .then(response => response.json())
//     .then(data => {
//       // Actualizar los datos de personajes DC
//       const personajesDCCompletos = data.personajes.filter(p => p.universo === "DC").map(p => ({
//         id: p.id,
//         universo: p.universo,
//         nombre: p.nombre,
//         nombreClave: p.nombreClave,
//         descripcion: p.descripcion,
//         ataque: p.ataque,
//         debilidad: p.debilidad,
//         resistencia: p.resistencia,
//         imagen: p.imagen
//       }));
      
//       // Actualizar los datos de personajes Marvel
//       const personajesMarvelCompletos = data.personajes.filter(p => p.universo === "Marvel").map(p => ({
//         id: p.id,
//         universo: p.universo,
//         nombre: p.nombre,
//         nombreClave: p.nombreClave,
//         descripcion: p.descripcion,
//         ataque1: p.ataque1,
//         ataque2: p.ataque2,
//         ataque3: p.ataque3,
//         debilidad: p.debilidad,
//         resistencia: p.resistencia,
//         imagen: p.imagen
//       }));
      
//       // Reemplazar los arrays simples por los completos
//       window.personajesDC = personajesDCCompletos;
//       window.personajesMarvel = personajesMarvelCompletos;
      
//       // muestra en consola si se cargo correctamente la informacion de los heroes
//       console.log("Personajes cargados:", personajesDCCompletos.length + personajesMarvelCompletos.length);
//     })
  
//   const pelea1 = document.querySelector(".pelea");
//   const modal = document.getElementById("modal-combate");
//   const cerrar = document.getElementById("cerrar-modal");

//   pelea1.addEventListener("click", () => {
//     modal.style.display = "block";
//     cargarTarjetas("jugador1");
//     cargarTarjetas("jugador2");
//   });

//   cerrar.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", (e) => {
//     if (e.target === modal) {
//       modal.style.display = "none";
//     }
//     if (e.target === modalBatalla) {
//       modalBatalla.style.display = "none";
//       logBatalla.innerHTML = "";
//     }
//     if (e.target === modalBatallaVisual) {
//       modalBatallaVisual.style.display = "none";
//     }
//   });
// });

// const seleccion = {
//   jugador1: null,
//   jugador2: null
// };

// function cargarTarjetas(jugadorId) {
//   const contenedor = document.getElementById("tarjetas-" + jugadorId);
//   if (!contenedor) {
//     console.error("Contenedor no encontrado:", "tarjetas-" + jugadorId);
//     return;
//   }
  
//   contenedor.innerHTML = "";

//   // Esperar a que se carguen los datos completos
//   setTimeout(() => {
//     // Verificar que los arrays existan y estén definidos
//     if (!window.personajesDC || !window.personajesMarvel) {
//       console.error("Arrays de personajes no disponibles");
//       return;
//     }
    
//     const todosLosPersonajes = [...window.personajesDC, ...window.personajesMarvel];
//     console.log("Total de personajes:", todosLosPersonajes.length);

//     todosLosPersonajes.forEach(personaje => {
//       const div = document.createElement("div");
//       div.classList.add("tarjeta");
//       div.innerHTML = `
//         <img src="${personaje.imagen}" alt="${personaje.nombre}" style="width:100%; height:70px; object-fit:cover;" onerror="this.src='/assets/img/placeholder.jpg'; console.error('Error cargando imagen:', this.src);">
//         <p>${personaje.nombre}</p>
//       `;
//       div.addEventListener("click", () => seleccionarPersonaje(jugadorId, personaje, div));
//       contenedor.appendChild(div);
//     });
//   }, 500); // Dar tiempo para que se carguen los personajes
// }

// function seleccionarPersonaje(jugadorId, personaje, divSeleccionado) {
//   seleccion[jugadorId] = personaje;
//   console.log(`Seleccionado para ${jugadorId}:`, personaje);

//   const tarjetas = document.querySelectorAll(`#tarjetas-${jugadorId} .tarjeta`);
//   tarjetas.forEach(t => t.classList.remove("seleccionada"));

//   divSeleccionado.classList.add("seleccionada");

//   verificarSeleccion();
// }

// function seleccionarAleatorio(jugadorNum) {
//   // Verificar que los arrays existan y estén definidos
//   if (!window.personajesDC || !window.personajesMarvel) {
//     console.error("Arrays de personajes no disponibles para selección aleatoria");
//     return;
//   }
  
//   const todosLosPersonajes = [...window.personajesDC, ...window.personajesMarvel];
//   const personajeAleatorio = todosLosPersonajes[Math.floor(Math.random() * todosLosPersonajes.length)];
//   const jugadorId = `jugador${jugadorNum}`;
//   seleccion[jugadorId] = personajeAleatorio;
//   console.log(`Selección aleatoria para ${jugadorId}:`, personajeAleatorio);

//   const tarjetas = document.querySelectorAll(`#tarjetas-${jugadorId} .tarjeta`);
//   tarjetas.forEach(t => {
//     const nombre = t.querySelector("p").textContent;
//     if (nombre === personajeAleatorio.nombre) {
//       t.classList.add("seleccionada");
//     } else {
//       t.classList.remove("seleccionada");
//     }
//   });

//   verificarSeleccion();
// }

// // MODAL DE BATALLA POR TEXTO
// const modalBatalla = document.getElementById("modal-batalla");
// const cerrarBatalla = document.getElementById("cerrar-modal-batalla") || document.getElementById("cerrar-batalla");
// const logBatalla = document.getElementById("logCombate") || document.getElementById("log-batalla");

// if (cerrarBatalla) {
//   cerrarBatalla.addEventListener("click", () => {
//     if (modalBatalla) modalBatalla.style.display = "none";
//     if (logBatalla) logBatalla.innerHTML = "";
//   });
// }

// function verificarSeleccion() {
//   if (seleccion.jugador1 && seleccion.jugador2) {
//     mostrarModalBatalla();
//     // Solo mostrar modal visual si existe el elemento
//     if (document.getElementById("modal-batalla-visual")) {
//       mostrarModalBatallaVisual();
//     }
//   }
// }

// function mostrarModalBatalla() {
//   // Primero asignamos datos a los personajes y agregamos la propiedad vida
//   const p1 = { ...seleccion.jugador1, vida: seleccion.jugador1.resistencia };
//   const p2 = { ...seleccion.jugador2, vida: seleccion.jugador2.resistencia };
  
//   // Guardamos los datos en el objeto de pelea para acceder desde funciones
//   window.estadoPelea = { jugador1: p1, jugador2: p2 };
  
//   // Actualizamos el contenido del modal con las cartas y barras de vida de cada jugador
//   const jugador1Info = document.getElementById("jugador1-info");
//   const jugador2Info = document.getElementById("jugador2-info");
  
//   if (jugador1Info && jugador2Info) {
//     jugador1Info.innerHTML = `
//       <h3>${p1.nombre}</h3>
//       <img src="${p1.imagen}" width="100">
      
//       <!-- Barra de vida mejorada -->
//       <div class="vida-contenedor">
//         <div class="vida-etiqueta">HP: ${p1.vida}/${p1.resistencia}</div>
//         <div class="vida-barra-contenedor">
//           <div id="vida-barra-1" class="vida-barra-relleno" style="width: 100%;"></div>
//         </div>
//       </div>
      
//       <button id="btn-ataque-1" class="btn-ataque">Atacar</button>
//     `;
    
//     jugador2Info.innerHTML = `
//       <h3>${p2.nombre}</h3>
//       <img src="${p2.imagen}" width="100">
      
//       <!-- Barra de vida mejorada -->
//       <div class="vida-contenedor">
//         <div class="vida-etiqueta">HP: ${p2.vida}/${p2.resistencia}</div>
//         <div class="vida-barra-contenedor">
//           <div id="vida-barra-2" class="vida-barra-relleno" style="width: 100%;"></div>
//         </div>
//       </div>
      
//       <button id="btn-ataque-2" class="btn-ataque">Atacar</button>
//     `;
    
//     // Mostramos el modal de batalla
//     modalBatalla.style.display = "block";
    
//     // Limpiamos el log de combate si existe
//     if (logBatalla) {
//       logBatalla.innerHTML = "";
//     }
    
//     // Agregamos listeners a los botones de ataque
//     document.getElementById("btn-ataque-1").addEventListener("click", () => atacarEnModal('jugador1'));
//     document.getElementById("btn-ataque-2").addEventListener("click", () => atacarEnModal('jugador2'));
//   }
// }

// // Agregamos la función de ataque que se ejecutará al hacer clic en los botones
// function atacarEnModal(atacante) {
//   const oponente = atacante === "jugador1" ? "jugador2" : "jugador1";
//   const jugadorNum = atacante === "jugador1" ? "1" : "2";
//   const oponenteNum = oponente === "jugador1" ? "1" : "2";

//   const atacanteDatos = window.estadoPelea[atacante];
//   const oponenteDatos = window.estadoPelea[oponente];
  
//   console.log(`${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre}`);
  
//   // Escoge un ataque aleatorio entre los tres disponibles
//   const ataques = [atacanteDatos.ataque1, atacanteDatos.ataque2, atacanteDatos.ataque3];
//   const daño = ataques[Math.floor(Math.random() * ataques.length)];
  
//   // Restar vida al oponente
//   oponenteDatos.vida -= daño;
//   if (oponenteDatos.vida < 0) oponenteDatos.vida = 0;
  
//   console.log(`Daño causado: ${daño}. ${oponenteDatos.nombre} queda con ${oponenteDatos.vida} de vida`);
  
//   // Actualizar barra de vida visual
//   const porcentaje = (oponenteDatos.vida / oponenteDatos.resistencia) * 100;
//   document.getElementById(`vida-barra-${oponenteNum}`).style.width = `${porcentaje}%`;
  
//   // Actualizar texto de vida
//   const vidaEtiqueta = document.querySelector(`#jugador${oponenteNum}-info .vida-etiqueta`);
//   if (vidaEtiqueta) {
//     vidaEtiqueta.textContent = `HP: ${oponenteDatos.vida}/${oponenteDatos.resistencia}`;
//   }
  
//   // Agregar efecto visual de daño
//   const oponenteElement = document.getElementById(`jugador${oponenteNum}-info`);
//   if (oponenteElement) {
//     oponenteElement.classList.add('recibe-daño');
//     setTimeout(() => {
//       oponenteElement.classList.remove('recibe-daño');
//     }, 300);
//   }
  
//   // Agregar log del ataque
//   if (logBatalla) {
//     logBatalla.innerHTML += `<p>${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre} causando ${daño} de daño.</p>`;
//     logBatalla.scrollTop = logBatalla.scrollHeight;
//   }
  
//   // Cambiar color de la barra de vida según porcentaje
//   const barraVida = document.getElementById(`vida-barra-${oponenteNum}`);
//   if (barraVida) {
//     if (porcentaje > 50) {
//       barraVida.style.backgroundColor = "#4caf50"; // Verde
//     } else if (porcentaje > 25) {
//       barraVida.style.backgroundColor = "#ff9800"; // Naranja
//     } else {
//       barraVida.style.backgroundColor = "#f44336"; // Rojo
//     }
//   }
  
//   // Verificar si hay un ganador
//   if (oponenteDatos.vida <= 0) {
//     // Deshabilitar botones de ataque
//     document.getElementById(`btn-ataque-1`).disabled = true;
//     document.getElementById(`btn-ataque-2`).disabled = true;
    
//     // Mostrar mensaje de victoria
//     if (logBatalla) {
//       logBatalla.innerHTML += `<p class="victoria">¡${atacanteDatos.nombre} ha ganado la batalla!</p>`;
//     }
    
//     // También podemos mostrar un alert o un modal de victoria más elegante
//     setTimeout(() => {
//       alert(`¡${atacanteDatos.nombre} ha ganado la batalla!`);
//     }, 500);
//   }
// }

// // MODAL VISUAL (mantenemos esta función por si la necesitas)
// const modalBatallaVisual = document.getElementById("modal-batalla-visual");
// const contenedorVisual = document.getElementById("batalla-visual");
// const cerrarVisual = document.getElementById("cerrar-batalla-visual");

// if (cerrarVisual) {
//   cerrarVisual.addEventListener("click", () => {
//     if (modalBatallaVisual) modalBatallaVisual.style.display = "none";
//   });
// }

// function mostrarModalBatallaVisual() {
//   if (!contenedorVisual) return;
  
//   const p1 = { ...seleccion.jugador1, vida: seleccion.jugador1.resistencia };
//   const p2 = { ...seleccion.jugador2, vida: seleccion.jugador2.resistencia };

//   contenedorVisual.innerHTML = `
//     <div style="display: flex; justify-content: space-between; align-items: center; padding: 30px;">
//       <!-- Jugador 1 -->
//       <div style="text-align: center;">
//         <h3>${p1.nombre}</h3>
//         <img src="${p1.imagen}" width="150">
//         <div style="margin: 10px 0;">
//           <div style="width: 150px; height: 20px; background: #ddd;">
//             <div id="vida-p1" style="width: 100%; height: 100%; background: green;"></div>
//           </div>
//           <p id="vida-p1-text">${p1.vida} HP</p>
//         </div>
//         <button id="btn-atacar" style="padding: 10px 20px;">Atacar</button>
//       </div>

//       <!-- Jugador 2 -->
//       <div style="text-align: center;">
//         <h3>${p2.nombre}</h3>
//         <img src="${p2.imagen}" width="150">
//         <div style="margin: 10px 0;">
//           <div style="width: 150px; height: 20px; background: #ddd;">
//             <div id="vida-p2" style="width: 100%; height: 100%; background: red;"></div>
//           </div>
//           <p id="vida-p2-text">${p2.vida} HP</p>
//         </div>
//       </div>
//     </div>
//   `;

//   modalBatallaVisual.style.display = "block";

//   document.getElementById("btn-atacar").addEventListener("click", () => {
//     const ataques = [p1.ataque1, p1.ataque2, p1.ataque3];
//     const daño = ataques[Math.floor(Math.random() * ataques.length)];

//     p2.vida -= daño;
//     if (p2.vida < 0) p2.vida = 0;

//     document.getElementById("vida-p2").style.width = `${(p2.vida / seleccion.jugador2.resistencia) * 100}%`;
//     document.getElementById("vida-p2-text").textContent = `${p2.vida} HP`;

//     if (p2.vida <= 0) {
//       alert(`${p1.nombre} ha ganado la batalla visual!`);
//       document.getElementById("btn-atacar").disabled = true;
//     }
//   });
// }




// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Página de peleas cargada");
  
//   try {
//     // Obtener datos de los peleadores desde localStorage
//     const peleadoresJSON = localStorage.getItem("peleadores");
//     console.log("Datos recuperados:", peleadoresJSON);
    
//     if (!peleadoresJSON) {
//       console.error("No se encontraron datos de peleadores en localStorage");
//       return;
//     }
    
//     const datos = JSON.parse(peleadoresJSON);
//     console.log("Datos parseados:", datos);
    
//     if (!datos || !datos.jugador1 || !datos.jugador2) {
//       console.error("Datos de peleadores incompletos", datos);
//       return;
//     }

//     const { jugador1, jugador2 } = datos;
//     console.log("Jugador 1:", jugador1);
//     console.log("Jugador 2:", jugador2);

//     // Inicializar vida
//     jugador1.vida = jugador1.resistencia;
//     jugador2.vida = jugador2.resistencia;

//     window.estadoPelea = { jugador1, jugador2 };

//     // Jugador 1
//     document.getElementById("nombre-j1").textContent = jugador1.nombre;
//     document.getElementById("imagen-j1").src = jugador1.imagen;
//     document.getElementById("vida-texto-j1").textContent = `Vida: ${jugador1.vida} / ${jugador1.resistencia}`;
//     document.getElementById("vida-barra-j1").style.width = "100%";

//     // Jugador 2
//     document.getElementById("nombre-j2").textContent = jugador2.nombre;
//     document.getElementById("imagen-j2").src = jugador2.imagen;
//     document.getElementById("vida-texto-j2").textContent = `Vida: ${jugador2.vida} / ${jugador2.resistencia}`;
//     document.getElementById("vida-barra-j2").style.width = "100%";
//   } catch (error) {
//     console.error("Error al inicializar la pelea:", error);
//   }
// });

// function atacar(atacante) {
//   try {
//     const oponente = atacante === "jugador1" ? "jugador2" : "jugador1";

//     const atacanteDatos = window.estadoPelea[atacante];
//     const oponenteDatos = window.estadoPelea[oponente];

//     console.log(`${atacanteDatos.nombre} ataca a ${oponenteDatos.nombre}`);

//     // Escoge un ataque aleatorio
//     const ataques = [atacanteDatos.ataque1, atacanteDatos.ataque2, atacanteDatos.ataque3];
//     const daño = ataques[Math.floor(Math.random() * ataques.length)];
//     console.log(`Daño causado: ${daño}`);

//     // Restar vida
//     oponenteDatos.vida -= daño;
//     if (oponenteDatos.vida < 0) oponenteDatos.vida = 0;

//     console.log(`${oponenteDatos.nombre} queda con ${oponenteDatos.vida} de vida`);

//     // Actualizar barra
//     const porcentaje = (oponenteDatos.vida / oponenteDatos.resistencia) * 100;
//     document.getElementById(`vida-barra-${oponente === "jugador1" ? "j1" : "j2"}`).style.width = `${porcentaje}%`;
//     document.getElementById(`vida-texto-${oponente === "jugador1" ? "j1" : "j2"}`).textContent =
//       `Vida: ${oponenteDatos.vida} / ${oponenteDatos.resistencia}`;

//     // Ganador
//     if (oponenteDatos.vida <= 0) {
//       console.log(`${atacanteDatos.nombre} ha ganado la batalla`);
//       const modalVictoria = document.getElementById("modalVictoria");
//       if (modalVictoria) {
//         const ganadorTexto = document.getElementById("ganadorTexto");
//         if (ganadorTexto) ganadorTexto.textContent = `¡${atacanteDatos.nombre} ha ganado la batalla!`;
//         modalVictoria.style.display = "flex";
//       } else {
//         alert(`${atacanteDatos.nombre} ha ganado la batalla.`);
//       }
//     }
//   } catch (error) {
//     console.error("Error durante el ataque:", error);
//   }
// }

// function cerrarModal() {
//   const modalVictoria = document.getElementById("modalVictoria");
//   if (modalVictoria) modalVictoria.style.display = "none";
//   window.location.href = "arena.html";
// }