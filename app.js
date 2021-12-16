const getElement = selector => {
  const element = document.getElementById(selector);
  if(element) return element;
  throw new Error(`Please check ${selector}, element not found.`);
};

const nameInput = getElement('player-name');
const valueInput = getElement('stat-value');
const rushingContainer = getElement('rushing');

class Player {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  };
};

class UI {
  addPlayerToDOM(player) {
    const { name, value } = player;
    
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-container');
    const dataDisplay = `
      <p class="player">${name}
        <span class"pos capitalize">${undefined}</span>
      </p>
      <p class="stat">
        <span class="value">${value}</span>
        <span class="unit">${undefined}</span>
      </p>
    `;
    rushingContainer.appendChild(playerContainer);
    playerContainer.innerHTML = dataDisplay;
    const nameEl = document.querySelector('.player');
    const attr = document.createAttribute('data-id');
    attr.value = name;
    nameEl.setAttributeNode(attr);

    Store.addPlayerData(player);
  }  

  clearInputFields() {
    nameInput.value = '';
    valueInput.value = '';
  }  
};

class Store {
  static getPlayerData() {
    return localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players'))
      : [];
  };

  static addPlayerData(player) {
    const playerData = { name:player.name, value:+player.value };
    let players = this.getPlayerData();
    players.push(playerData);
    localStorage.setItem('players', JSON.stringify(players));
  };

  static updatePlayerData(player) {
    let players = this.getPlayerData();
    let result = players.find(({ name }) => name === player.name);
    players = players.map(object => {
      if(object.name === result.name) object.value = +object.value + +player.value;
      return object;
    });
    localStorage.setItem('players', JSON.stringify(players));
  }

  static displayStoredData() {
    let players = this.getPlayerData();
    players.forEach(player => {
      const ui = new UI;
      ui.addPlayerToDOM(player);
    });
  }

  static deletePlayerData() {
    localStorage.clear();
    location.reload();
  }
};

// Event Listeners
getElement('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value,
        value = valueInput.value;

  const player = new Player(name, value);
  const ui = new UI;

  // TODO: At some point functionality will need to decide what ot do here

  ui.clearInputFields();
  nameInput.focus(); 
});

// document.addEventListener('DOMContentLoaded', Store.displayStoredData());

getElement('clear-btn').addEventListener('click', () => Store.deletePlayerData());

console.log(editFlag);