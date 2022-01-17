const getElement = selector => {
  const element = document.getElementById(selector);
  if(element) return element;
  throw new Error(`Please check ${selector}, element not found.`);
};

// Initial Submit Form Inputs
const nameInput = getElement('player-name');
const valueInput = getElement('stat-value');
const posSelect = getElement('positions');
const statSelect = getElement('stat');
// Display Catagories
const rushingContainer = getElement('rushing');
const receivingContainer = getElement('receiving');
const sacksContainer = getElement('sacks');
const intContainer = getElement('ints');
// Modal Elements
const errModal = getElement('err-modal');
const editBtns = document.querySelectorAll('.edit-btn');
const editModal = getElement('edit-modal');
const editPlayerModal = getElement('edit-player-modal');
const modalContent = getElement('edit-modal-content');
const editPlayerModalContent = getElement('edit-player-modal-content');
const updateForm = getElement('edit-player-form');
// Update Form Inputs
const updateNameInput = getElement('update-player-name');
const updatePosInput = getElement('update-positions');
const updateStatValueInput = getElement('update-stat-value');
const updateStatTypeInput = getElement('update-stat');

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
      let { name, pos, value, statShort, statType } = player;
      const dataDisplay = `
        <p class="player">${name}
          <span class="pos uppercase">${pos}</span>
        </p>
        <p class="stat">
          <span class="value">${value}</span>
          <span class="unit">${this.formatStatAbbr(value, statShort)}</span>
          <button type="button" class="edit-player-btn" data-name="${name}">
            <i class="ri-edit-box-line"></i>
          </button>
          <button type="button" class="delete-player-btn" data-name="${name}">
            <i class="ri-delete-bin-4-fill"></i>
          </button>
        </p>
      `;
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container');
      playerContainer.dataset.statType = statType;
      playerContainer.innerHTML = dataDisplay;
      modalContent.appendChild(playerContainer);

      const editPlayerBtn = playerContainer.lastElementChild.querySelector('.edit-player-btn');
      editPlayerBtn.addEventListener('click', e => {
        const targetName = e.currentTarget.getAttribute('data-name');
        const targetStatType = e.currentTarget.parentElement.parentElement.getAttribute('data-stat-type');

        this.editPlayerModalContent(targetName, targetStatType);
      });

      const deletePlayerBtn = playerContainer.lastElementChild.querySelector('.delete-player-btn');
      deletePlayerBtn.addEventListener('click', e => {
        const targetName = e.currentTarget.getAttribute('data-name');
        const targetStatType = e.currentTarget.parentElement.parentElement.getAttribute('data-stat-type');

        console.log(targetStatType)

        Store.deletePlayer(targetName, targetStatType);
      });
    });
  };

  editPlayerModalContent(targetName, targetStatType) {
    let players = Store.getPlayerData();
    const objMatch = players.find(({ name, statType }) => {
      return name === targetName && statType === targetStatType;
    });
    if(objMatch) {
      const dataDisplay = `
          <p class="player">${objMatch.name}
            <span class="pos uppercase">${objMatch.pos}</span>
          </p>
          <p class="stat">
            <span class="value">${objMatch.value}</span>
            <span class="unit">${this.formatStatAbbr(objMatch.value, objMatch.statShort)}</span>
          </p>
        `;
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container');
      playerContainer.innerHTML = dataDisplay;
      editPlayerModalContent.appendChild(playerContainer);
    };
    
    editPlayerModal.classList.add('open');

    updateNameInput.value = objMatch.name;
    updatePosInput.value = this.updatePosOptionValue(objMatch);
    updateStatValueInput.value = objMatch.value;
    updateStatTypeInput.value = objMatch.statType;
    
    updateForm.addEventListener('submit', e => {
      e.preventDefault();

      const existingPlayerElement = editPlayerModalContent.querySelector('.player-container');
      editPlayerModalContent.removeChild(existingPlayerElement);

      Store.editStoredPlayerObject(objMatch);
    });
  };

  updatePosOptionValue(objMatch) {
    let positionOptions = editPlayerModalContent.querySelectorAll('option');
    let result = '';
    positionOptions.forEach(option => {
      if(objMatch.pos === option.getAttribute('data-short'))result = option.value;
    });
    return result;
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
      return name === player.name && statType === player.statType;
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

  static editStoredPlayerObject(objMatch) {
    const nameUpdate = updateNameInput.value,
          posUpdate = updatePosInput.options.item(updatePosInput.selectedIndex).getAttribute('data-short'),
          valueUpdate = updateStatValueInput.value,
          statShortUpdate = updateStatTypeInput.options.item(updateStatTypeInput.selectedIndex).getAttribute('data-short'),
          statTypeUpdate = updateStatTypeInput.options.item(updateStatTypeInput.selectedIndex).value;

    let players = this.getPlayerData();

    console.log(statShortUpdate);

    players = players.map(obj => {
      if(obj.name === objMatch.name && obj.statType === objMatch.statType) {
        obj.name = nameUpdate;
        obj.pos = posUpdate;
        obj.value = valueUpdate;
        obj.statShort = statShortUpdate;
        obj.statType = statTypeUpdate;
      }
      return obj;
    });
    localStorage.setItem('players', JSON.stringify(players));
    
    editPlayerModal.classList.remove('open');
    editModal.classList.remove('open')
    location.reload();
  };

  static deletePlayer(targetName, targetStatType) {
    let players = this.getPlayerData();
    let result;
    players = players.filter(obj => {
      if(obj.name !== targetName || obj.statType !== targetStatType) {
        return result = obj;
      }
    });
    localStorage.setItem('players', JSON.stringify(players));
    location.reload();
  }
  
  static deleteAllPlayerData() {
    localStorage.clear();
    location.reload();
  };
};

// Event Listeners
// initial submit
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

// display storage on page load
document.addEventListener('DOMContentLoaded', () => {
  let players = Store.getPlayerData();
  const ui = new UI;
  ui.setOrder(players);
});

getElement('clear-btn').addEventListener('click', () => Store.deleteAllPlayerData());
getElement('err-close').addEventListener('click', () => errModal.classList.remove('open'));
getElement('edit-close').addEventListener('click', () => {
  editModal.classList.remove('open');
  const playerContainers = modalContent.querySelectorAll('.player-container');
  playerContainers.forEach(container => {
    modalContent.removeChild(container);
  });
});

// open catagory edit window
for(let btn of editBtns) {
  const ui = new UI;
  btn.addEventListener('click', () => {
    const btnCatagory = btn.dataset.catagory;
    if(btn) ui.editModalContent(btnCatagory);
    editModal.classList.add('open');
    window.scrollTo({ top: 0 })
  });
};

// close edit player modal (cancel edit)
getElement('edit-close-btn').addEventListener('click', () => {
  const playerContainer = editPlayerModalContent.querySelector('.player-container');
  editPlayerModalContent.removeChild(playerContainer);
  editPlayerModal.classList.remove('open');
});