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
        <input type="text" placeholder="🔍 Buscar personaje por nombre o nombre clave..." autocomplete="on"/>
      </div>
    `;
    this.shadowRoot.innerHTML = templateSearchBox;
  }

  // permite que el evento input suba al DOM principal
  connectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      const valor = e.target.value;

      this.dispatchEvent(new CustomEvent('input', {
        detail: valor,
        bubbles: true,
        composed: true
      }));

      const fakeInput = document.querySelector('#fake-search');
      if (fakeInput) fakeInput.value = valor;
    });
  }
}
customElements.define('search-box-label', SearchBox);



function mostrarPersonajes(filtro) {
  const cartas = document.querySelectorAll('.heroes cartas-dc');
  
  cartas.forEach(carta => {
    const nombre = carta.getAttribute('filtro');
    // Mostrar solo las cartas que coincidan o todas si el filtro es "Todos"
    if (filtro === 'Todos' || nombre === filtro) {
      carta.style.display = 'block';
    } else {
      carta.style.display = 'none';
    }
  });
}

// Este evento se dispara desde el componente web personalizado cuando el usuario escribe en el input
document.addEventListener('input', (event) => {
  const textoBusqueda = event.detail.toLowerCase(); // lo pasamos a minúsculas para comparación

  const personajesFiltrados = personajes.filter(p =>
    p.universo === "DC" && (
      p.nombre.toLowerCase().includes(textoBusqueda) ||
      p.nombreClave.toLowerCase().includes(textoBusqueda)
    )
  );

  mostrarPersonajes(personajesFiltrados);
});



// fetch de personajes
let personajes = [];
fetch('http://localhost:3000/personajes')
  .then(res => res.json())
  .then(data => {
    personajes = data;
    mostrarPersonajes(personajes);
  });

function crearCard(personaje) {
  const card = document.createElement('div');
  card.classList.add('personaje');
  card.innerHTML = `
    <img src="${personaje.imagen}" alt="${personaje.nombre}" />
    <h2>${personaje.nombre} (${personaje.nombreClave})</h2>
    <p><strong>Universo:</strong> ${personaje.universo}</p>
    <p><strong>Descripción:</strong> ${personaje.descripcion}</p>
    <p><strong>Ataque:</strong> ${personaje.ataque}</p>
    <p><strong>Resistencia:</strong> ${personaje.resistencia}</p>
    <p><strong>Debilidad:</strong> ${personaje.debilidad}</p>
  `;
  return card;
}

function mostrarPersonajes(lista) {
  const contenedor = document.getElementById('personajesContainer');
  contenedor.innerHTML = '';
  lista.forEach(personaje => contenedor.appendChild(crearCard(personaje)));
}

// Escuchar input desde el componente
document.querySelector('search-box-label')
  .addEventListener('input', (e) => {
    const texto = e.detail.toLowerCase();
    const filtrados = personajes.filter(p =>
      p.nombre.toLowerCase().includes(texto) || 
      p.nombreClave.toLowerCase().includes(texto)
    );
    mostrarPersonajes(filtrados);
  });
