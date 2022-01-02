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
const modal = getElement('modal');

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
      const div = document.createElement('div');
      div.classList.add('playerContainer');
      const dataDisplay = `
        <p class="player">${name}
          <span class="pos uppercase">${pos}</span>
        </p>
        <p class="stat">
          <span class="value">${value}</span>
          <span class="unit">${this.formatStatAbbr(value, statShort)}</span>
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
      };

      div.textContent = dataDisplay;
      console.log(div.innerHTML);
      return div.innerHTML;
    });
  };
  
  setOrder(players) {
    players.sort((a, b) => b.value - a.value);
    this.updateDOM(players);
  };

  formatStatAbbr(value, statShort) {
    return value === 1 ? statShort.slice(0, -1) : statShort;
  };

  clearInputFields() {
    nameInput.value = '';
    valueInput.value = '';
    nameInput.focus();
  };  

  openModal() {
    modal.classList.add('open');
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
    const objMatch = players.find(({ name, statType }) => {
      return name === player.name && statType === player.statType
    });
    
    if(!objMatch) {
      this.addPlayerData(player);
    } else {
      players = players.map(obj => {
        if(obj === objMatch) obj.value = +obj.value + +player.value;
        return obj;
      });
      localStorage.setItem('players', JSON.stringify(players));
    };
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
  const ui = new UI;
  
  if(name === '' || value === '') {
    ui.openModal();
  } else {
    Store.updatePlayerData(player);
  };
  
  ui.clearInputFields();
});

document.addEventListener('DOMContentLoaded', () => {
  let players = Store.getPlayerData();
  const ui = new UI;
  ui.setOrder(players);
});

getElement('clear-btn').addEventListener('click', () => Store.deletePlayerData());
getElement('close-btn').addEventListener('click', () => {
  modal.classList.remove('open');
});