const getElement = selector => {
  const element = document.getElementById(selector);
  if(element) return element;
  throw new Error(`Please check ${selector}, element not found.`);
};

const nameInput = getElement('player-name');
const valueInput = getElement('stat-value');
const posSelect = getElement('positions');
const statSelect = getElement('stat');

const rushingContainer = getElement('rushing');
const receivingContainer = getElement('receiving');
const sacksContainer = getElement('sacks');
const intContainer = getElement('ints');

class Player {
  constructor(name, pos, value, statShort, statType) {
    this.name = name;
    this.pos = pos;
    this.value = value;
    this.statShort = statShort;
    this.statType = statType;
  };
};

class UI {
  addPlayerToDOM(player) {
    const { name, pos, value, statShort, statType } = player;
    const dataDisplay = `
      <p class="player">${name}
        <span class="pos uppercase">${pos}</span>
      </p>
      <p class="stat">
        <span class="value">${value}</span>
        <span class="unit">${statShort}</span>
      </p>
    `;
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-container');
    const attr = document.createAttribute('data-id');
    attr.value = name;
    
    if(statType === "Rushing Yards") {
      rushingContainer.appendChild(playerContainer);
      playerContainer.innerHTML = dataDisplay;
      playerContainer.setAttributeNode(attr);
    } else if (statType === "Receiving Yards") {
      receivingContainer.appendChild(playerContainer);
      playerContainer.innerHTML = dataDisplay;
      playerContainer.setAttributeNode(attr);
    } else if (statType === "Sacks") {
      sacksContainer.appendChild(playerContainer);
      playerContainer.innerHTML = dataDisplay;
      playerContainer.setAttributeNode(attr);
    } else {
      intContainer.appendChild(playerContainer);
      playerContainer.innerHTML = dataDisplay;
      playerContainer.setAttributeNode(attr);
    }

  };

  clearInputFields() {
    nameInput.value = '';
    valueInput.value = '';
    nameInput.focus();
  };  
};

class Store {
  static getPlayerData() {
    return localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players'))
      : [];
  };

  static addPlayerData(player) {
    const playerData = { name:player.name, pos:player.pos, value:+player.value, statShort:player.statShort, statType:player.statType };
    let players = Store.getPlayerData();
    players.push(playerData);
    localStorage.setItem('players', JSON.stringify(players));
  };

  static updatePlayerData(player) {
    let players = Store.getPlayerData();
    const result = players.find(({ name }) => name === player.name);
    players = players.map(object => {
      if(object.name === result.name) object.value = +object.value + +player.value;
      return object;
    });
    localStorage.setItem('players', JSON.stringify(players));
  };

  static displayStoredData() {
    const players = Store.getPlayerData();
    players.forEach(player => {
      const ui = new UI;
      ui.addPlayerToDOM(player);
    });
  };

  static checkForStoredName(player) {
    const players = Store.getPlayerData();
    return players.find(({ name }) => name === player.name);
  };

  static deletePlayerData() {
    localStorage.clear();
    location.reload();
  };
};

// Event Listeners
getElement('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value,
        value = valueInput.value,
        pos = posSelect.options.item(posSelect.selectedIndex).getAttribute('data-short'),
        statShort = statSelect.options.item(statSelect.selectedIndex).getAttribute('data-short'),
        statType = statSelect.options.item(statSelect.selectedIndex).value;
  
  const player = new Player(name, pos, value, statShort, statType);
  const ui = new UI;
        
  const nameCheck = Store.checkForStoredName(player);
  if(name === '' || value === '') {
    alert('Enter all values');
  } else if(nameCheck === undefined) {
    ui.addPlayerToDOM(player);
    Store.addPlayerData(player);
  } else {
    Store.updatePlayerData(player);
    location.reload();
  };

  ui.clearInputFields();
});

document.addEventListener('DOMContentLoaded', Store.displayStoredData);

getElement('clear-btn').addEventListener('click', () => Store.deletePlayerData());