import get from '../util/getElement.js';
import { getYardage } from '../util/getCourse.js';

const gridDisplay = get('grid-display');

const createInputCell = () => {
  const scoreInputEl = document.createElement('input');
  scoreInputEl.className = 'cell scoreInput';
  scoreInputEl.setAttribute('type', 'text');
  gridDisplay.appendChild(scoreInputEl);
}

let holeOutNum = 1;
let holeInNum = 10;
const createDisplayCell = (y, x) => {
  const cellEl = document.createElement('div');
  // Populate Hole Number
  cellEl.className = 'cell';
  if(y === 5) {
    cellEl.textContent = holeOutNum;
    holeOutNum++;
  }
  if(y === 5 && x === 9) cellEl.textContent = 'OUT';
  if(y === 5 && x >= 10) {
    cellEl.textContent = holeInNum;
    holeInNum++;
  }
  if(y === 5 && x === 19) cellEl.textContent = 'IN';
  if(y === 5 && x === 20) cellEl.textContent = 'TOT'
  gridDisplay.appendChild(cellEl);
}

const createLabelRow = x => {
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
  if(x === 5) labelEl.setAttribute('id', 'golfer3');
  if(x === 6) labelEl.setAttribute('id', 'golfer4');
  gridDisplay.appendChild(labelEl);
}

const createGrid = () => {
  let height = 21;
  let width = 8;

  for(let i = 0; i < width; i++) {
    createLabelRow(i);
  }
  
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      let inputColumn = x + 1;
      let row = y;

      if(inputColumn === 3 || inputColumn === 4 || inputColumn === 6 || inputColumn === 7) {
        createInputCell();
      } else {
        createDisplayCell(inputColumn, row);
      }
    }
  }
}

export default createGrid;