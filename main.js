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

const errModal = getElement('err-modal');
const editBtns = document.querySelectorAll('.edit-btn');
const editModal = getElement('edit-modal');
const modalContent = getElement('modal-content');

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
  // Main Page Display
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
      return div.innerHTML;
    });
  };
  
  setOrder(players, ) {
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

  // Modals Display
  editModalContent(btnCatagory) {
    let players = Store.getPlayerData();
    let filteredPlayers = players.filter(player => player.statType === btnCatagory).sort((a, b) => a.value - b.value);
    filteredPlayers.forEach(player => {
      let { name, pos, value, statShort } = player;
      const dataDisplay = `
        <p class="player">${name}
          <span class="pos uppercase">${pos}</span>
        </p>
        <p class="stat">
          <span class="value">${value}</span>
          <span class="unit">${this.formatStatAbbr(value, statShort)}</span>
          <button type="button" class="edit-player" id="edit-player">
            <i class="ri-edit-box-line"></i>
          </button>
        </p>
      `;
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container');
      playerContainer.innerHTML = dataDisplay;
      modalContent.appendChild(playerContainer);
    });
  };
};

// Storage
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
    errModal.classList.add('open');
  } else {
    Store.updatePlayerData(player);
  };
  
  ui.clearInputFields();
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  let players = Store.getPlayerData();
  const ui = new UI;
  ui.setOrder(players);
});

getElement('clear-btn').addEventListener('click', () => Store.deletePlayerData());
getElement('err-close').addEventListener('click', () => errModal.classList.remove('open'));
getElement('edit-close').addEventListener('click', () => {
  editModal.classList.remove('open');
  const playerContainers = modalContent.querySelectorAll('.player-container');
  console.log(playerContainers);
  playerContainers.forEach(container => {
    modalContent.removeChild(container);
  });
});

for(let btn of editBtns) {
  const ui = new UI;
  btn.addEventListener('click', () => {
    const btnCatagory = btn.dataset.catagory;
    if(btn) ui.editModalContent(btnCatagory);
    editModal.classList.add('open');
    window.scrollTo({ top: 0 })
  });
};