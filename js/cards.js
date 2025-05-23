// componente de las cartas de marvel
class CartasMarvel extends HTMLElement {
  constructor() {
    super();
    // esto es para permitir el shadow DOM
    this.attachShadow({ mode: 'open' });

    const templateMarvel = /* HTML */ `
    <!-- con el host se aplicacan estilos especificos a la etiqueta del html, es decir, a la carta -->
      <style>
        :host {
          display: inline-block;
          width: 100%;
          max-width: 20rem;
          height: 28rem;
          margin: 1rem;
          perspective: 50rem;
          font-family: 'Montserrat','Arial', sans-serif;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          text-decoration: none;
          transform-style: preserve-3d;
          box-shadow: 0 0px 20px rgba(0, 255, 255, 0.2);
          border-radius: 15px;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          scrollbar-width: none;
        }

        .card:hover { 
          transform: translateY(-10px) scale(1.05) rotateZ(1deg);
          box-shadow: 0 15px 30px rgba(255, 0, 0, 0.6), 0 0 20px rgba(0, 255, 255, 0.5);
        } 

        .card:hover img {
          transform: scale(1.05);
        }

        .card.flipped {
          transform: rotateY(180deg);
        }

        .card.flipped img{
          display: none;
        }

        .card-front, .card-back {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          overflow: hidden;
          background: linear-gradient(135deg, #111 0%, #222 100%);
          border: 4px solid #666;
          box-shadow: inset 0 0 20px rgba(255, 0, 0, 0.2), inset 0 0 10px rgba(0, 255, 255, 0.2);
        }

        .card-back {
          transform: rotateY(180deg);
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
        } 

        img {
          width: 100%;
          max-height: 75%;
          object-fit: cover;
          border-bottom: 2px solid #555;
          filter: contrast(1.1) brightness(1.1);
          transition: transform 0.4s ease;
        }

        .card-content {
          padding: 1rem;
        }

        #nombreClave {
          font-size: 1.4rem;
          color: #FF3C3C ;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 5px #000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        #nombre {
          font-size: 1.3rem;
          font-weight: bold;
          color: #f0f0f0;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px #000;
        }

        #universo {
          font-size: 1rem;
          font-weight: bolder;
          color: #00ccff;
          margin-top: 0.5rem;
          text-shadow: 0 0 2px #00ccff;
        }

        .info-label {
          font-weight: bold;
          margin-top: 1.2rem;
          color: #f0f0f0;
          text-shadow: 0 0 3px #ff0066;
        }

        .stats {
          display: flex;
          justify-content: space-between;
          margin-top: 0.6rem;
        }
        
        .stat {
          text-align: center;
          flex: 1;
          margin-left: 1rem;
          margin-right: 1rem;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #0fc;
          text-shadow: 0 0 6px rgba(0, 255, 255, 0.7), 0 0 8px rgba(255, 0, 0, 0.5); }

        .stat-label {
          font-size: 0.8rem;
          color: #ccc;
        }

        .info-value {
          color: #ddd;
          font-size: 0.9rem;
          margin-top: 0.2rem;
          line-height: 1.2rem;
          text-align: center;
          text-shadow: 0 0 2px #000;
        }

        @media (max-width: 768px) {
          :host {
            max-width: 14rem;
            height: 22rem;
            margin: 0.6rem;
          }
          
          .card-content {
            padding: 0.8rem;
          }
          
          #nombre, #nombreClave {
            font-size: 1rem;
            margin-bottom: 3px;
          }
          
          #universo {
            font-size: 0.85rem;
          }
          
          .info-label {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }
          
          .stat-value {
            font-size: 1rem;
          }
          
          .stat-label {
            font-size: 0.7rem;
          }
        }
      </style>
      
      <div class="card">

        <div class="card-front">
          <img id="imagen">
          <div class="card-content">
            <div id="nombreClave"></div>
            <div id="nombre"></div>
            <div id="universo"></div>
          </div>
        </div>
        
        <div class="card-back">
          <div id="back-nombre" class="info-label">Nombre:</div>
          <div id="back-nombre-value" class="info-value"></div>
          
          <div id="back-nombreClave" class="info-label">Nombre Clave:</div>
          <div id="back-nombreClave-value" class="info-value"></div>
          
          <div id="back-universo" class="info-label">Universo:</div>
          <div id="back-universo-value" class="info-value"></div>
          
          <div id="back-descripcion" class="info-label">Descripción:</div>
          <div id="back-descripcion-value" class="info-value"></div>

          <div class="info-label">Estadísticas:</div>
          <div class="stats">
            <div class="stat">
              <div id="ataque-value" class="stat-value"></div>
              <div class="stat-label">Ataque</div>
            </div>
            <div class="stat">
              <div id="resistencia-value" class="stat-value"></div>
              <div class="stat-label">Resistencia</div>
            </div>
          </div>
          
          <div class="info-label">Debilidad:</div>
          <div id="debilidad-value" class="info-value"></div>

        </div>
      </div>
    `;
    // agregar el html y el css con la constante aparte, lo arganicé de esta forma para poder ver el codigo mas corto.
    this.shadowRoot.innerHTML = templateMarvel;

    // esto sirve para buscar dentro del shadow DOM el elemento que tenga de clase .card, es decir, la carta, y cuando se le da click, se ejecuta un evento de que es de "flipped", y se voltea la carta activando la clase .flipped
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.shadowRoot.querySelector('.card').classList.toggle('flipped');
    });
  }
  // Se ejecuta cuando se agrega al DOM para poder cargar los datos directamente desde el json, es la parte y la funcionalidad principal del cargado de datos a traves del json.
  // el callback es iniciado cuando el componente se agrega al html para poder cargar los datos del json 
  connectedCallback() {
  fetch('http://localhost:3000/personajes')
  //  Hace una petición HTTP a un servidor local que devuelve un archivo JSON con todos los personajes.
    .then(res => res.json())
    // convierte el formato JSON en un objeto para js, obtiene el valor de filtro y se convierte a minusculas y se les quita lso espacios para poder trabajar de forma sencilla con ellos 
    .then(data => {
      const filtro = this.getAttribute("filtro")?.toLowerCase().trim();

      let personaje;

      // obtiene el valor de filtro y lo edita para trabajar con el.
      if (filtro) {
        // Busca el personaje cuyo nombre incluya el filtro
        personaje = data.find(p => p.nombreClave.toLowerCase().includes(filtro));
      }
      // si hay un valor de filtro, busca dentro de la lista data un personaje cuyo nombre clave sea este valor del filtro
      if (personaje) {
        this.data = personaje;
        // en caso de que no encuentra nada cambia el valor del nombre por otro texto
      } else {
        this.shadowRoot.querySelector(".nombre").textContent = "Personaje no encontrado";
      }
    });
  }

  // este bloque de codigo es escencial para que el attributeChangedCallback funcione, sin el, no serviria el codigo a la hora de cambiar los valores
  static get observedAttributes() {
    return ['filtro'];
  }
  // este metodo se activa cuando se cambia los datos de un atributo desde el html, pero solo se tiene en cuente el filtro, el oldVal en realidad no se tiene en cuenta pero está ahí para cambiar los datos antiguos en caso de que se necesiten cambiar.
  // este codigo en realidad no es relevante a menos que se cambien los valores del filtro de ofrma constante.
  attributeChangedCallback(name, oldVal, newValue) {
    if (name === 'filtro') {
      // llama a un método para filtrar la carta según el nombre clave.
      this.filtrarPorNombreClave(newValue);
    }
  }

  // cargar los datos que tengan "d", en realidad puede ser cualqueir valro pero se escogio este porque es la sigla de data y es mas facil reconocerlo.
  set data(d) {
    this._datos = d;

    // los carga a traves del id de cada div con el query selector
    // estos son los dato de la forma frontal de la carta
    this.shadowRoot.querySelector('#imagen').src = d.imagen;
    this.shadowRoot.querySelector('#nombre').textContent = d.nombre;
    this.shadowRoot.querySelector('#nombreClave').textContent = d.nombreClave;
    this.shadowRoot.querySelector('#universo').textContent = d.universo;
    // estos son los datos de la forma trasera de la carta
    this.shadowRoot.querySelector('#back-nombre-value').textContent = d.nombre;
    this.shadowRoot.querySelector('#back-nombreClave-value').textContent = d.nombreClave;
    this.shadowRoot.querySelector('#back-universo-value').textContent = d.universo;
    this.shadowRoot.querySelector('#back-descripcion-value').textContent = d.descripcion;
    // estos son los datos relevantes de la pelea
    this.shadowRoot.querySelector('#ataque-value').textContent = d.ataque;
    this.shadowRoot.querySelector('#resistencia-value').textContent = d.resistencia;
    this.shadowRoot.querySelector('#debilidad-value').textContent = d.debilidad;

    // establece el atributo filtro para poder agarrar el nombre clave del cual se van a basar todo los datos
    this.filtrarPorNombreClave(this.getAttribute('filtro') || '');
  }

  // esta funcion nos ayuda a facilitar mejor la filtracion de los personajes a traves del atributo filtro
  filtrarPorNombreClave(filtro) {
    // primero crea una variable para almacenar y acceder al valor del nombre clave del heroe con el this.data, lo convierte a lower case para que sea mas sencillo trabajar con el
    const clave = this._datos.nombreClave.toLowerCase();
    filtro = filtro.toLowerCase();

    // se usa un condicional ternario para definir el estilo de si la tarjeta se muestra (inline-block) o se oculta verificando si clave tiene el texto filtro.
    this.style.display = clave.includes(filtro) ? 'inline-block' : 'none';
  }
}

// definir la forma customizable de la etiqueta que se va a usar 
customElements.define('cartas-marvel', CartasMarvel);


// componente de las cartas de DC
class CartasDc extends HTMLElement {
  constructor() {
    super();
    // esto es para permitir el shadow DOM
    this.attachShadow({ mode: 'open' });
    
    const templateDC = /* HTML */ `
    <!-- con el host se aplican estilos especificos a la etiqueta del html, es decir, a la carta -->
      <style>
        :host {
          display: inline-block;
          width: 100%;
          max-width: 20rem;
          height: 28rem;
          margin: 1rem;
          perspective: 50rem;
          font-family: 'Montserrat', 'Arial', sans-serif;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          text-decoration: none;
          transform-style: preserve-3d;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          scrollbar-width: none;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.03) rotateZ(1deg);
          box-shadow: 0 12px 24px rgba(0, 0, 255, 0.3), 0 12px 24px rgba(0, 0, 255, 0.3);;
        }

        .card.flipped {
          transform: rotateY(180deg);
        }

        .card.flipped img{
          display: none;
        }

        .card-front, .card-back {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          overflow: hidden;
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          border: 4px solid #444;
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .card-back {
          transform: rotateY(180deg);
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
        }

        img {
          width: 100%;
          max-height: 75%;
          object-fit: cover;
          border-bottom: 2px solid #555;
        }

        .card-content {
          padding: 1rem;
        }

        #nombreClave {
          font-size: 1.3rem;
          color: #64B5F6 ;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px #000;
          text-transform: uppercase;
        }

        #nombre {
          font-size: 1.3rem;
          font-weight: bold;
          color: #f0f0f0;
          margin-bottom: 5px;
          text-shadow: 1px 1px 2px #000;
        }

        #universo {
          font-size: 1rem;
          font-weight: bolder;
          color: #ccc;
          margin-top: 0.5rem;
        }

        .info-label {
          font-weight: bold;
          margin-top: 1.2rem;
          color: #f0f0f0;
        }

        .stats {
          display: flex;
          justify-content: space-between;
          margin-top: 0.6rem;
        }

        .stat {
          text-align: center;
          flex: 1;
          margin-left: 1rem;
          margin-right: 1rem;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 0 5px rgba(0, 0, 255, 0.5), 0 0 5px rgba(0, 0, 255, 0.5);; 
        }

        .stat-label {
          font-size: 0.8rem;
          margin-left: 1rem;
          margin-right: 1rem;
          color: #ccc;
        }

        @media (max-width: 768px) {
          :host {
            max-width: 14rem;
            height: 22rem;
            margin: 0.6rem;
          }
          
          .card-content {
            padding: 0.8rem;
          }
          
          #nombre, #nombreClave {
            font-size: 1rem;
            margin-bottom: 3px;
          }
          
          #universo {
            font-size: 0.85rem;
          }
          
          .info-label {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }
          
          .stat-value {
            font-size: 1rem;
          }
          
          .stat-label {
            font-size: 0.7rem;
          }
        }
      </style>

      <div class="card">

        <div class="card-front">
          <img id="imagen">
          <div class="card-content">
            <div id="nombreClave"></div>
            <div id="nombre"></div>
            <div id="universo"></div>
          </div>
        </div>
        
        <div class="card-back">
          <div id="back-nombre" class="info-label">Nombre:</div>
          <div id="back-nombre-value" class="info-value"></div>
          
          <div id="back-nombreClave" class="info-label">Nombre Clave:</div>
          <div id="back-nombreClave-value" class="info-value"></div>
          
          <div id="back-universo" class="info-label">Universo:</div>
          <div id="back-universo-value" class="info-value"></div>
          
          <div id="back-descripcion" class="info-label">Descripción:</div>
          <div id="back-descripcion-value" class="info-value"></div>

          <div class="info-label">Estadísticas:</div>
          <div class="stats">
            <div class="stat">
              <div id="ataque-value" class="stat-value"></div>
              <div class="stat-label">Ataque</div>
            </div>
            <div class="stat">
              <div id="resistencia-value" class="stat-value"></div>
              <div class="stat-label">Resistencia</div>
            </div>
          </div>
          
          <div class="info-label">Debilidad:</div>
          <div id="debilidad-value" class="info-value"></div>

        </div>
      </div>
    `;
    // agregar el html y el css con la constante aparte, lo arganicé de esta forma para poder ver el codigo mas corto.
    this.shadowRoot.innerHTML = templateDC;

    // esto sirve para buscar dentro del shadow DOM el elemento que tenga de clase .card, es decir, la carta, y cuando se le da click, se ejecuta un evento de que es de "flipped", y se voltea la carta activando la clase .flipped
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.shadowRoot.querySelector('.card').classList.toggle('flipped');
    });
  }
  // Se ejecuta cuando se agrega al DOM para poder cargar los datos directamente desde el json, es la parte y la funcionalidad principal del cargado de datos a traves del json.
  // el callback es iniciado cuando el componente se agrega al html para poder cargar los datos del json 
  connectedCallback() {
  fetch('http://localhost:3000/personajes')
  //  Hace una petición HTTP a un servidor local que devuelve un archivo JSON con todos los personajes.
    .then(res => res.json())
    // convierte el formato JSON en un objeto para js, obtiene el valor de filtro y se convierte a minusculas y se les quita lso espacios para poder trabajar de forma sencilla con ellos 
    .then(data => {
      const filtro = this.getAttribute("filtro")?.toLowerCase().trim();

      let personaje;

      // obtiene el valor de filtro y lo edita para trabajar con el.
      if (filtro) {
        // Busca el personaje cuyo nombre incluya el filtro
        personaje = data.find(p => p.nombreClave.toLowerCase().includes(filtro));
      }
      // si hay un valor de filtro, busca dentro de la lista data un personaje cuyo nombre clave sea este valor del filtro
      if (personaje) {
        this.data = personaje;
        // en caso de que no encuentra nada cambia el valor del nombre por otro texto
      } else {
        this.shadowRoot.querySelector(".nombre").textContent = "Personaje no encontrado";
      }
    });
  }
  // este bloque de codigo es escencial para que el attributeChangedCallback funcione, sin el, no serviria el codigo a la hora de cambiar los valores
  static get observedAttributes() {
    return ['filtro'];
  }
  // este metodo se activa cuando se cambia los datos de un atributo desde el html, pero solo se tiene en cuente el filtro, el oldVal en realidad no se tiene en cuenta pero está ahí para cambiar los datos antiguos en caso de que se necesiten cambiar.
  // este codigo en realidad no es relevante a menos que se cambien los valores del filtro de ofrma constante.
  attributeChangedCallback(name, oldVal, newValue) {
    if (name === 'filtro') {
      // llama a un método para filtrar la carta según el nombre clave.
      this.filtrarPorNombreClave(newValue);
    }
  }

  // cargar los datos que tengan "d", en realidad puede ser cualqueir valro pero se escogio este porque es la sigla de data y es mas facil reconocerlo.
  set data(d) {
    this._datos = d;

    // los carga a traves del id de cada div con el query selector
    // estos son los dato de la forma frontal de la carta
    this.shadowRoot.querySelector('#imagen').src = d.imagen;
    this.shadowRoot.querySelector('#nombre').textContent = d.nombre;
    this.shadowRoot.querySelector('#nombreClave').textContent = d.nombreClave;
    this.shadowRoot.querySelector('#universo').textContent = d.universo;
    // estos son los datos de la forma trasera de la carta
    this.shadowRoot.querySelector('#back-nombre-value').textContent = d.nombre;
    this.shadowRoot.querySelector('#back-nombreClave-value').textContent = d.nombreClave;
    this.shadowRoot.querySelector('#back-universo-value').textContent = d.universo;
    this.shadowRoot.querySelector('#back-descripcion-value').textContent = d.descripcion;
    // estos son los datos relevantes de la pelea
    this.shadowRoot.querySelector('#ataque-value').textContent = d.ataque;
    this.shadowRoot.querySelector('#resistencia-value').textContent = d.resistencia;
    this.shadowRoot.querySelector('#debilidad-value').textContent = d.debilidad;

    // establece el atributo filtro para poder agarrar el nombre clave del cual se van a basar todo los datos
    this.filtrarPorNombreClave(this.getAttribute('filtro') || '');
  }

  // esta funcion nos ayuda a facilitar mejor la filtracion de los personajes a traves del atributo filtro
  filtrarPorNombreClave(filtro) {
    // primero crea una variable para almacenar y acceder al valor del nombre clave del heroe con el this.data, lo convierte a lower case para que sea mas sencillo trabajar con el
    const clave = this._datos.nombreClave.toLowerCase();
    filtro = filtro.toLowerCase();

    // se usa un condicional ternario para definir el estilo de si la tarjeta se muestra (inline-block) o se oculta verificando si clave tiene el texto filtro.
    this.style.display = clave.includes(filtro) ? 'inline-block' : 'none';
  }
}

customElements.define('cartas-dc', CartasDc);
