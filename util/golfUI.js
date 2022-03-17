import get from "./getElement.js";

const input = get('golfer-name');

// UI (display)
export default class UI {
  updateDom() {
    
    const golferOne = get('golfer1');
    const golferTwo = get('golfer2');
    const golferThree = get('golfer3');
    const golferFour = get('golfer4');

    const golfers = [golferOne, golferTwo, golferThree, golferFour];
    const name = input.value;


    for(let el of golfers) {
      if(el.textContent === '') golfers.textContent = `${name}`;
    }
  

    input.value = '';
  }
}

