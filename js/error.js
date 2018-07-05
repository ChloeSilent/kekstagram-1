'use strict';

(function () {

  var Color = {
    ERROR: 'rgba(150, 10, 24, 0.75)',
    SUCCESS: 'rgba(255, 204, 20, 1)'
  };

  /**
   * Показываем сообщения об ошибках или успехе,
   * произошедших по ходу загрузки данных с сервера или отправки данных на сервер
   * @param  {string} text - текст сообщения
   * @param  {string} color - цвет блока, на котором будет размещено сообщение
   */
  var showMessage = function (text, color) {
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-message');
    errorBlock.style.background = color;
    errorBlock.style.position = 'absolute';
    errorBlock.style.zIndex = '2';
    errorBlock.style.top = '70px';
    errorBlock.style.left = '50%';
    errorBlock.style.transform = 'translateX(-50%)';
    errorBlock.style.display = 'flex';
    errorBlock.style.width = '80%';

    var errorText = document.createElement('p');
    errorText.style.color = 'rgba(250, 248, 255, 1)';
    errorText.style.fontWeight = 'bold';
    errorText.style.fontSize = '24px';
    errorText.style.margin = '20px auto';
    errorText.textContent = text;

    errorBlock.appendChild(errorText);
    document.querySelector('main').appendChild(errorBlock);

    document.addEventListener('click', hideErrorMessage);
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
