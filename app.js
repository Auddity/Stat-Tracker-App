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
  updateDOM(players) {
    players.forEach(player => {
      let { name, pos, value, statShort } = player;
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
      
      if(player.statType === "Rushing Yards") {
        rushingContainer.appendChild(playerContainer);
        playerContainer.innerHTML = dataDisplay;
      } else if (player.statType === "Receiving Yards") {
        receivingContainer.appendChild(playerContainer);
        playerContainer.innerHTML = dataDisplay;
      } else if (player.statType === "Sacks") {
        sacksContainer.appendChild(playerContainer);
        playerContainer.innerHTML = dataDisplay;
      } else {
        intContainer.appendChild(playerContainer);
        playerContainer.innerHTML = dataDisplay;
      }
    });
  };

  setOrder(players) {
    players.sort((a, b) => b.value - a.value);
    const ui = new UI;
    ui.updateDOM(players);
  }

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
    const playerData = { 
      name:player.name, 
      pos:player.pos, 
      value:+player.value, 
      statShort:player.statShort, 
      statType:player.statType 
    };
    let players = Store.getPlayerData();
    players.push(playerData);
    localStorage.setItem('players', JSON.stringify(players));
  };

  static updatePlayerData(player) {
    let players = Store.getPlayerData();
    const result = players.find(({ name }) => name === player.name);
    if(result) {
      players = players.map(object => {
        if(object.name === result.name) object.value = +object.value + +player.value;
        return object;
      });
      localStorage.setItem('players', JSON.stringify(players));   
    } else {
      this.addPlayerData(player);
    }

    location.reload();
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
  
  if(name === '' || value === '') {
    alert('Enter all values');
  } else {
    Store.updatePlayerData(player);
  };
  
  const ui = new UI;
  ui.clearInputFields();
});

document.addEventListener('DOMContentLoaded', () => {
  let players = Store.getPlayerData();
  const ui = new UI;
  ui.setOrder(players);
});

getElement('clear-btn').addEventListener('click', () => Store.deletePlayerData());