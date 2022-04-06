const alertMessage = (className, message, parent) => {
  const messPara = document.createElement('p');
  messPara.className = `${className}`;
  messPara.textContent = message;
  parent.appendChild(messPara);

  setTimeout(() => {
    messPara.remove(className);
  }, 3800);
};

export default alertMessage;