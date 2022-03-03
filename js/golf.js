import get from "../util/getElement.js";
import createGrid from "../util/golfDisplay.js";

const form = get('form');
const input = get('player-name');

// const playerOne = get('player1');
// const playerTwo = get('player2');
// const playerThree = get('player3');
// const playerFour = get('player4');


window.document.addEventListener('DOMContentLoaded', createGrid)

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(`${input.value}`);
})