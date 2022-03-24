import get from "./getElement.js";

const nameInput = get('golfer-name');
const teeInput = get('tee-box');

// UI (display)
export default class UI {
  updateDom() {
    const golferOne = get('golfer1');
    const golferTwo = get('golfer2');
    const golferThree = get('golfer3');
    const golferFour = get('golfer4');
    const golfers = [golferOne, golferTwo, golferThree, golferFour];
    const name = nameInput.value;
    for(let el of golfers) {
      
    }
    nameInput.value = '';
    teeInput.value = '';
  }
}

