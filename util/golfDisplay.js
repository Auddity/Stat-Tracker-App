import get from '../util/getElement.js';

const gridDisplay = get('grid-display');

const createInputCell = () => {
  const scoreInputEl = document.createElement('input');
  scoreInputEl.className = 'cell scoreInput';
  scoreInputEl.setAttribute('type', 'text');
  gridDisplay.appendChild(scoreInputEl);
}

const createDisplayCell = (y) => {
  const cellEl = document.createElement('div');
  cellEl.className = 'cell';
// temp begin
  cellEl.textContent = `${y}`;
// temp end
  gridDisplay.appendChild(cellEl);
}

const createLabelRow  = x => {
  const labelEl = document.createElement('div');
  labelEl.className = 'cell label';
  labelEl.style.background = 'green';
  if(x === 0) labelEl.textContent = 'Yardage';
  if(x === 1) labelEl.textContent = 'Handicap';
  if(x === 4) labelEl.textContent = 'Hole';
  if(x === 7) labelEl.textContent = 'Par';
  if(x === 0 || x === 1 || x === 4 || x === 7) labelEl.classList.add('label');
  if(x === 2) labelEl.setAttribute('id', 'golfer1');
  if(x === 3) labelEl.setAttribute('id', 'golfer2');
  if(x === 4) labelEl.setAttribute('id', 'golfer3');
  if(x === 5) labelEl.setAttribute('id', 'golfer4');
  gridDisplay.appendChild(labelEl);
}


const createGrid = () => {
  let height = 20;
  let width = 8;

  for(let i = 0; i < width; i++) {
    createLabelRow(i);
  }
  
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      let inputColumn = x + 1;
      
      if(inputColumn === 3 || inputColumn === 4 || inputColumn === 6 || inputColumn === 7) {
        createInputCell();
      } else {
        createDisplayCell(inputColumn);
      }
    }
  }
}

export default createGrid;