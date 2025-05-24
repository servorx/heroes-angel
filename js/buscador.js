class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const templateSearchBox = /* HTML */`
      <style>
        .search-box {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 3rem auto 4rem auto;
          padding: 1rem;
          width: 100%;
          max-width: 45rem;
          border-radius: 30px;
        }

        input[type="text"] {
          width: 100%;
          height: 3.5rem;
          padding: 0 1.5rem;
          font-size: 1.2rem;
          letter-spacing: 1px;
          border-radius: 30px;
          border: 3px solid #ff003c; 
          background-color: #0d1117;
          color: #fff;
          transition: all 0.3s ease-in-out;
          outline: none;
        }

        input[type="text"]::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        input[type="text"]:focus {
          border-color: #007bff; 
          box-shadow: 0 0 15px rgba(0, 123, 255, 0.7), 0 0 10px rgba(255, 0, 60, 0.5);
          background-color: #121826;
        }

        @media (max-width: 768px) {
          .search-box {
            flex-direction: column;
            max-width: 70%;
            margin: 2rem;
            padding: 1rem;
          }
          input[type="text"] {
            height: 3rem;
            font-size: 1rem;
            padding: 0 1rem;
            border-radius: 25px;
          }
        }
      </style>

      <div class="search-box">
        <input type="text" placeholder="🔍 Buscar personaje por nombre o nombre clave..." id="buscador"/>
      </div>
    `;
    this.shadowRoot.innerHTML = templateSearchBox;
  }
  // permite que el evento input suba al DOM principal, se llama a este callback cuando se carga la pagina por s
  connectedCallback() {
    // se obtiene el shadow input que esta adentro de la barra de busqueda 
    const input = this.shadowRoot.querySelector('input');

    // agrega el listener de modo que cuando se ingresa un valor en el input, se pasa a minusculas, el target se usa para retonar el objeto que se ingresa
    input.addEventListener('input', () => {
      const valor = input.value.toLowerCase();

      // Obtener todas las cartas DC y Marvel del documento principal
      const cartasDC = document.querySelectorAll('.heroes cartas-dc');
      const cartasMarvel = document.querySelectorAll('.heroes cartas-marvel');

      // Combinar todas las cartas en un solo arreglo
      [...cartasDC, ...cartasMarvel].forEach(carta => {
        const filtro = carta.getAttribute('filtro')?.toLowerCase() || '';
        // obtiene el valor del filtro y en caso de que coincidan con el input o con una parte, muestran la carta con el mismo nombre del filtro que se ingreso
        carta.style.display = filtro.includes(valor) ? 'block' : 'none';
      });
    });
  }
}
customElements.define('search-box-label', SearchBox);

