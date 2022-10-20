export function getElement(selector){
  const element = document.getElementById(selector);
  if(element) return element;
  throw new Error(`Please check ${selector}, element not found.`);
};

export function getAll(selector) {
  const elements = document.querySelectorAll(selector);
  if(elements) return elements;
  throw new Error(`Please check ${selector}, elements not found`)
}