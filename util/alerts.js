const alertMessage = (className, message, parent) => {
  const messPara = document.createElement('p');
  messPara.className = `${className}`;
  messPara.textContent = message;
  parent.appendChild(messPara);

  setTimeout(() => {
    messPara.remove(className);
  }, 3500);
};

export default alertMessage;