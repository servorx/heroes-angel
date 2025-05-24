// se define el componente de la barra de bsqueda para los superheroes en js
class SearchBox extends HTMLElement {
  constructor() {
    super();
    // este bloque de codigo de shadow DOM sirve para encapsular estilos y estructura de forma abierta
    this.attachShadow({ mode: 'open' });
    // se define el arreglo vacio para que se guarden los cambios de los nombres clave de los heroes que se usen para la barra de busqueda
    this.heroes = [];

    const templateSearchBox = /*HTML*/`
      <style>
        .search-container {
          display: flex;
          justify-content: center;
          margin: 3rem auto 4rem auto;
          padding: 1rem;
          position: relative;
        }

        input {
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 10px;
          border: none;
          width: 100%;
          max-width: 45rem;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        input::placeholder {
          color: #ccc;
        }

        input:focus {
          background-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          outline: none;
        }

        .autocomplete-results {
          position: absolute;
          top: 110%;
          width: 100%;
          max-width: 500px;
          background-color: rgba(0, 0, 0, 0.9);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.8);
          z-index: 1000;
          overflow: hidden;
        }

        .autocomplete-results li {
          list-style: none;
          padding: 0.75rem 1rem;
          color: #fff;
          cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          transition: background-color 0.2s ease;
        }

        .autocomplete-results li:hover {
          background-color: #650000;
          font-weight: bold;
        }
      </style>

      <div class="search-container">
        <input type="text" placeholder="Buscar héroe por nombre clave...">
        <ul class="autocomplete-results"></ul>
      </div>
    `;
    // se traen los estilos y la estrcutura del componente en el shadow DOM
    this.shadowRoot.innerHTML = templateSearchBox;
  }

  // al ser una funcion asincrona se ejecuta cuando se añade el DOM a la pagina
  async connectedCallback() {
    // se declara de la forma en la que se van a seleccionar la etiqueta input y la clase .autocomplete-results
    const input = this.shadowRoot.querySelector('input');
    const resultsBox = this.shadowRoot.querySelector('.autocomplete-results');

    // cargar la lista de los heroes desde el servidor de JSON
    const res = await fetch('http://localhost:3000/personajes');
    const data = await res.json();
    this.heroes = data.map(p => p.nombreClave.toLowerCase());

    // Mostrar sugerencias mientras se escribe y actualizar constantemente por cada input que haya
    input.addEventListener('input', () => {
      const valor = input.value.toLowerCase();
      const resultados = this.heroes.filter(h => h.includes(valor));
      resultsBox.innerHTML = resultados.map(nombre => `<li>${nombre}</li>`).join('');
      this.filtrarCartas(valor);
    });

    // para que cuando el usuario le de enter se cierre el autocompletado
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        resultsBox.innerHTML = '';
        this.filtrarCartas(input.value.toLowerCase());
      }
    });

    // para que cuando el usuario le de click en una sugerencia esta se autocomplete
    resultsBox.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        input.value = e.target.innerText;
        resultsBox.innerHTML = '';
        this.filtrarCartas(input.value.toLowerCase());
      }
    });

    // para que cuando el usuario le de click afuera del output desaparezca la lista de los autocompletados 
    document.addEventListener('click', (e) => {
      if (!this.shadowRoot.contains(e.target)) {
        this.shadowRoot.querySelector('.autocomplete-results').innerHTML = '';
      }
    });
  }

  // para poder filtrar las cartas segun el valor ingresado por el usuario con un array
  filtrarCartas(valor) {
    const cartas = [
      ...document.querySelectorAll('.heroes cartas-dc'),
      ...document.querySelectorAll('.heroes cartas-marvel')
    ];

    cartas.forEach(carta => {
      const filtro = carta.getAttribute('filtro')?.toLowerCase() || '';
      carta.style.display = filtro.includes(valor) ? 'block' : 'none';
    });
  }
}

customElements.define('search-box-label', SearchBox);
