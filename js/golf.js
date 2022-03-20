import get from "../util/getElement.js";
import createGrid from "../util/golfDisplay.js";
import UI from "../util/golfUI.js";

window.document.addEventListener('DOMContentLoaded', createGrid);

const input = get('golfer-name');

class Golfer {
  constructor(name, score, handicap) {
    this.name = name;
    this.score = score;
    this.handicap = handicap;
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
  const name = input.value;
  const golfer = new Golfer(name);
  const ui = new UI;

  name === '' ? alert("enter a player's name") : Store.updateGolfersData(golfer), ui.updateDom();
  // ui.updateDom();
});