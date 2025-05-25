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
              <slot name="jugador1"></slot>
              <button class="btn-aleatorio" data-jugador="1">Aleatorio</button>
            </div>
            <div class="jugador-seleccion" id="jugador2">
              <h3>Jugador 2</h3>
              <slot name="jugador2"></slot>
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
    this.modal.classList.add('visible');
    this.modal.classList.remove('oculto');
  }

  close() {
    this.modal.classList.remove('visible');
    this.modal.classList.add('oculto');
  }
}

customElements.define('modal-seleccion', modalSeleccionPersonaje);



