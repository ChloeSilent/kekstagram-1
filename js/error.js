'use strict';

(function () {

  var Color = {
    ERROR: 'rgba(150, 10, 24, 0.75)',
    SUCCESS: 'rgba(255, 204, 20, 1)'
  };

  var TIMEOUT = 5000; // ms - таймаут в 5 секунд - убираем сообщения через 5 секунд

  /**
   * Показываем сообщения об ошибках или успехе,
   * произошедших по ходу загрузки данных с сервера или отправки данных на сервер
   * @param  {string} text - текст сообщения
   * @param  {string} color - цвет блока, на котором будет размещено сообщение
   */
  var showMessage = function (text, color) {
    var errorBlockElement = document.createElement('div');
    errorBlockElement.classList.add('error-message');
    errorBlockElement.style.background = color;
    errorBlockElement.style.position = 'absolute';
    errorBlockElement.style.zIndex = '2';
    errorBlockElement.style.top = '70px';
    errorBlockElement.style.left = '50%';
    errorBlockElement.style.transform = 'translateX(-50%)';
    errorBlockElement.style.display = 'flex';
    errorBlockElement.style.width = '80%';

    var errorTextElement = document.createElement('p');
    errorTextElement.style.color = 'rgba(250, 248, 255, 1)';
    errorTextElement.style.fontWeight = 'bold';
    errorTextElement.style.fontSize = '24px';
    errorTextElement.style.margin = '20px auto';
    errorTextElement.textContent = text;

    errorBlockElement.appendChild(errorTextElement);
    document.querySelector('main').appendChild(errorBlockElement);

    document.addEventListener('click', hideErrorMessage);

    setTimeout(hideErrorMessage, TIMEOUT);
  };

  /**
   * Удаляем сообщение об ошибке
   */
  var hideErrorMessage = function () {
    document.querySelector('.error-message').remove();
    document.removeEventListener('click', hideErrorMessage);
  };

  window.error = {
    showFaultMessage: function (text) {
      showMessage(text, Color.ERROR);
    },

    showSuccessMessage: function (text) {
      showMessage(text, Color.SUCCESS);
    }
  };

})();
