'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  window.helpers = {
    KeyCode: KeyCode,

    /**
     * Генерация случайного числа
     * @param {integer} min - номер первого элемента из массива
     * @param {integer} max - номер последнего элемента из массива - не включая это значение
     * @return {integer} - номер случайного элемента из массива
     */
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    /**
     * Перемещиваем массив случайным образом
     * @param  {Array} arr - исходный массив
     * @return  {Array} - получившийся массив
     */
    shuffleArray: function (arr) {
      var result = [];
      while (arr.length > 0) {
        var random = this.getRandomNumber(0, arr.length);
        result.push(arr.splice(random, 1)[0]);
      }
      return result;
    },

    /**
     * Переключаем оверлэй, добавляем/удаляем клавиатурный слушатель события на документе
     * @param  {Node} overlay - переключаемый оверлэй
     * @param  {function} escHandler - клавиатурный обработчик события
     */
    toggleOverlay: function (overlay, escHandler) {
      if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        document.addEventListener('keydown', escHandler);
      } else {
        overlay.classList.add('hidden');
        document.removeEventListener('keydown', escHandler);
      }
    }
  };
})();
