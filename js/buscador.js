class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /* HTML */`
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
        <input type="text" placeholder="🔍 Buscar personaje por seudónimo o nombre clave..." autocomplete="on"/>
      </div>
    `;
  }

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

customElements.define('search-box', SearchBox);

// Mostrar tarjetas de héroes
fetch('http://localhost:3000/personajes')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector('.heroes');

    data.forEach(hero => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('tarjeta-hero', `cartas-${hero.editorial.toLowerCase()}`);

      tarjeta.innerHTML = /* HTML */`
        <h2 class="nombre">${hero.nombre}</h2>
        <p><strong>Alias:</strong> ${hero.alias}</p>
        <p><strong>Editorial:</strong> ${hero.editorial}</p>
      `;

      contenedor.appendChild(tarjeta);
    });
  });

// Filtrar tarjetas en tiempo real
document.querySelector("search-box").addEventListener("input", (e) => {
  const searchText = e.detail.toLowerCase();
  const todasLasCartas = document.querySelectorAll(".cartas-dc, .cartas-marvel");

  todasLasCartas.forEach(hero => {
    const nombre = hero.shadowRoot?.querySelector("nombre");
    if (!nombre) return;

    const nameText = nombre.textContent.toLowerCase();
    hero.style.display = nameText.includes(searchText) ? "block" : "none";
  });
});
