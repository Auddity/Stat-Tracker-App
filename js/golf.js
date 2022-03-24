import get from "../util/getElement.js";
import createGrid from "../util/golfDisplay.js";
import UI from "../util/golfUI.js";

window.document.addEventListener('DOMContentLoaded', createGrid);

const nameInput = get('golfer-name');
const teeInput = get('tee-box');

class Golfer {
  constructor(name, score, handicap, tee) {
    this.name = name;
    this.score = score;
    this.handicap = handicap;
    this.tee = tee;
  }
}

// Storage
class Store {
  static getStoredGolfers() {
    return localStorage.getItem('golfers') ? JSON.parse(localStorage.getItem('golfers')) : [];
  }

  static addGolferData(golfer) {
    const golferData = {
      name:golfer.name,
      score:golfer.score,
      handicap:golfer.handicap
    }
    let golfers = this.getStoredGolfers();
    golfers.push(golferData)
    localStorage.setItem('golfers', JSON.stringify(golfers));
  }

  static updateGolfersData(golfer) {
    let golfers = this.getStoredGolfers();
    const objMatch = golfers.find(({ name }) => {
      return name === golfer.name;
    });
    if(!objMatch) {
      this.addGolferData(golfer);
    } 
  }
}

// Event Listeners
get('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value;
  const tee = teeInput.value;
  const golfer = new Golfer(name, tee);
  const ui = new UI;

  // name === '' || tee === '' ? alert("enter a player's name") : Store.updateGolfersData(golfer), ui.updateDom();
  ui.updateDom();
});