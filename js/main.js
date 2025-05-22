// // Asegúrate de que el DOM esté cargado antes de asignar los eventos
// document.addEventListener('DOMContentLoaded', function() {
//   // Asignar los eventos a los botones de navegación
//   document.getElementById('btn-home').addEventListener('click', function() {
//     mostrarVista('inicio');
//   });

//   document.getElementById('btn-marvel').addEventListener('click', function() {
//     mostrarVista('marvel');
//   });

//   document.getElementById('btn-dc').addEventListener('click', function() {
//     mostrarVista('dc');
//   });

//   document.getElementById('btn-arena').addEventListener('click', function() {
//     mostrarVista('arena');
//   });
// });

// //java de la barra de busqueda
// class SearchBox extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });

//     // Estilo del componente
//     this.shadowRoot.innerHTML = `
//       <style>
//         .search-box {
//         margin-left: 10%;
//         margin-right: 10%;
//         padding: 10px;
//         }

//         input[type="text"] {
//         display: flex;
//         align-items: center;
//         margin-left: auto;
//         margin-right: auto;
//         width: 100%;
//         height: 50px;
//         }
//       </style>
//       <div class="search-box">
//         <input type="text" placeholder="🔍 Buscar personaje por seudonimo..." />
//       </div>
//     `;
//   }

//   connectedCallback() {
//     const input = this.shadowRoot.querySelector('input');
//     input.addEventListener('input', (e) => {
//       const valor = e.target.value;
//       this.dispatchEvent(new CustomEvent('input', {
//         detail: valor,
//         bubbles: true,
//         composed: true
//       }));
//       const fakeInput = document.querySelector('#fake-search');
//       if (fakeInput) fakeInput.value = valor;
//     });
//   }
// }
// customElements.define('search-box', SearchBox);

// document.querySelector("search-box").addEventListener("input", (e) => {
//   const searchText = e.detail.toLowerCase();
//   document.querySelectorAll(".cartas-dc").forEach(hero => {
//     const name = hero.querySelector("nombre").textContent.toLowerCase();
//     hero.style.display = name.includes(searchText) ? "block" : "none";
//   });
// });
