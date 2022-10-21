import { getElement } from "../util/getElement.js";
import createGrid from "../util/golfDisplay.js";
import UI from "../util/golfUI.js";

window.document.addEventListener('DOMContentLoaded', createGrid);

const nameInput = getElement('golfer-name');
const teeInput = getElement('tee-box');

class Golfer {
  constructor(name, tee, score, handicap) {
    this.name = name;
    this.tee = tee;
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
      tee:golfer.tee,
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
getElement('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value;
  const tee = teeInput.value;
  const golfer = new Golfer(name, tee);
  const ui = new UI;

  name === '' || tee === '' ? alert("enter a player's name and tee box") : Store.updateGolfersData(golfer), ui.updateDom();
});