import get from '../util/getElement.js';

const createGrid = () => {
  let cells = 180;
  const gridDisplay = get('grid-display');
  
  while(cells > 0) {
    cells--;
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';
    gridDisplay.appendChild(cellEl);
  }

  // const playerOne = get('player1');
  // const playerTwo = get('player2');
  // const playerThree = get('player3');
  // const playerFour = get('player4');
}

export default createGrid;