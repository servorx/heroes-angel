let db = {};
let player1 = {}, player2 = {}, turno = 1;

async function loadData() {
  try {
    const res = await fetch('db.json');
    db = await res.json();
    populateSelectors();
  } catch (err) {
    console.error('Error al cargar el archivo JSON:', err);
  }
}

function populateSelectors() {
  const allPokemon = [...(db.Primera || []), ...(db.Septima || [])];
  const sel1 = document.getElementById('player1Select');
  const sel2 = document.getElementById('player2Select');

  allPokemon.forEach(poke => {
    const opt1 = new Option(poke.nombre, JSON.stringify(poke));
    const opt2 = new Option(poke.nombre, JSON.stringify(poke));
    sel1.appendChild(opt1);
    sel2.appendChild(opt2);
  });
}

function startBattle() {
  player1 = JSON.parse(document.getElementById('player1Select').value);
  player2 = JSON.parse(document.getElementById('player2Select').value);

  player1.hp = parseInt(player1.vida);
  player2.hp = parseInt(player2.vida);

  document.getElementById('p1Name').innerText = player1.nombre;
  document.getElementById('p2Name').innerText = player2.nombre;
  document.getElementById('selectionScreen').style.display = 'none';
  document.getElementById('battleScreen').style.display = 'block';
  updateUI();
}

function updateUI() {
  document.getElementById('p1Bar').style.width = (player1.hp / player1.vida * 100) + '%';
  document.getElementById('p2Bar').style.width = (player2.hp / player2.vida * 100) + '%';
  document.getElementById('p1HP').innerText = `${player1.hp} / ${player1.vida} HP`;
  document.getElementById('p2HP').innerText = `${player2.hp} / ${player2.vida} HP`;
  document.getElementById('btnP1').disabled = turno !== 1;
  document.getElementById('btnP2').disabled = turno !== 2;
}

function attack(playerNum) {
  const attacker = playerNum === 1 ? player1 : player2;
  const defender = playerNum === 1 ? player2 : player1;

  const dmg = parseInt(attacker.ataque) + Math.floor(Math.random() * 6);
  defender.hp = Math.max(0, defender.hp - dmg);

  log(`${attacker.nombre} hace ${dmg} de daño a ${defender.nombre}`);

  if (defender.hp === 0) {
    log(`🎉 ${attacker.nombre} gana la batalla!`);
    document.getElementById('btnP1').disabled = true;
    document.getElementById('btnP2').disabled = true;
    return;
  }

  turno = turno === 1 ? 2 : 1;
  updateUI();
}

function log(msg) {
  const logBox = document.getElementById('battleLog');
  logBox.innerHTML += `<div>${msg}</div>`;
  logBox.scrollTop = logBox.scrollHeight;
}

document.getElementById('startBattleBtn').addEventListener('click', startBattle);
document.getElementById('btnP1').addEventListener('click', () => attack(1));
document.getElementById('btnP2').addEventListener('click', () => attack(2));

window.addEventListener('DOMContentLoaded', loadData);
