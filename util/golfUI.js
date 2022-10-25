import { getElement, getAll } from "./getElement.js";
import { populateCourseData } from "./golfDisplay.js";
import alertMessage from "./alerts.js";

const nameInput = getElement('golfer-name');
const teeInput = getElement('tee-box');

// UI (display)
export default class UI {
  updateDom() {
    const golferOne = getElement('golfer1');
    const golferTwo = getElement('golfer2');
    const golferThree = getElement('golfer3');
    const golferFour = getElement('golfer4');
    const golfers = [golferOne, golferTwo, golferThree, golferFour];
    const name = nameInput.value;

    if(golfers.every(el => el.textContent !== '')) {
      alertMessage(
        'success', 
        'Foursome is complete', 
        getElement('header'));
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

  updateDOMfromStored(storedGolfers) {
    const golferOne = getElement('golfer1');
    const golferTwo = getElement('golfer2');
    const golferThree = getElement('golfer3');
    const golferFour = getElement('golfer4');
    const golferDisplays = [golferOne, golferTwo, golferThree, golferFour];

    golferDisplays.forEach((display, i) => {
      display.textContent = `${storedGolfers[i].name}`
    })
  }
};