import get from '../util/getElement.js';

const createGrid = () => {
  let cells = 168;
  let base = 10;
  let increment = 8;
  const gridDisplay = get('grid-display');
  
    // const scoreInputEl = document.createElement('input');
  //   scoreInputEl.className = 'cell scoreInput';
  //   scoreInputEl.setAttribute('type', 'text');
  //   scoreInputEl.style.background = 'red';
  //   gridDisplay.appendChild(scoreInputEl);
  
  for(let i = 0; i < cells; i++) {
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';
    if(i === 0) cellEl.textContent = 'Yardage';
    if(i === 1) cellEl.textContent = 'Handicap';
    if(i === 4) cellEl.textContent = 'Hole';
    if(i === 7) cellEl.textContent = 'Par';
    if(i === 0 || i === 1 || i === 4 || i === 7) cellEl.classList.add('label');
    if(i === 2) cellEl.setAttribute('id', 'player1');
    if(i === 3) cellEl.setAttribute('id', 'player2');
    if(i === 4) cellEl.setAttribute('id', 'player3');
    if(i === 5) cellEl.setAttribute('id', 'player4');

    if(i >= 8) cellEl.textContent = `${i}`;



    gridDisplay.appendChild(cellEl);
    
    
  }


  // const playerOne = get('player1');
  // const playerTwo = get('player2');
  // const playerThree = get('player3');
  // const playerFour = get('player4');
}

export default createGrid;