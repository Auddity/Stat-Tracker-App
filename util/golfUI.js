import get from "./getElement.js";
import alertMessage from "./alerts.js";

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

    if(golfers.every(el => el.textContent !== '')) {
      alertMessage(
        'warning', 
        'Foursome is full', 
        get('header'));
    } else {
      for(let el of golfers) {
        if(el.textContent === '') {
          el.textContent = `${name}`;
          break;
        };
      };
    };

    nameInput.value = '';
    teeInput.value = '';
  }
};