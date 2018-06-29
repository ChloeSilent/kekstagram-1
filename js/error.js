'use strict';

(function () {

  var showErrorMessage = function (err) {
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-message');
    errorBlock.style.background = 'rgba(150, 10, 24, 0.75)';
    errorBlock.style.position = 'absolute';
    errorBlock.style.zIndex = '2';
    errorBlock.style.top = '10px';
    errorBlock.style.display = 'flex';
    errorBlock.style.width = '80%';

    var errorText = document.createElement('p');
    errorText.style.color = 'rgba(0, 33, 55, 1)';
    errorText.style.fontWeight = 'bold';
    errorText.style.margin = '20px auto';
    // errorText.textContent = 'Ошибка при загрузке данных';
    errorText.textContent = err;

    errorBlock.appendChild(errorText);
    document.querySelector('main').appendChild(errorBlock);

    document.addEventListener('click', hideErrorMessage);
  };

  var hideErrorMessage = function () {
    document.querySelector('error-message').classList.add('hidden');
    // document.querySelector('.error-message').remove();
    document.removeEventListener('click', hideErrorMessage);
  };

  window.showErrorMessage = showErrorMessage;
})();
