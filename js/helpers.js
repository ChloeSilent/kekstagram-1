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
     * Генерация случайного объекта из массива
     * @param {Array} arr - изначальный массив
     * @return {integer} - номер случайного объекта из массива
     */
    getRandomInt: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },


    /**
     * Перемещиваем массив случайным образом - Логика:
     * Выбераем случайный индекс, добавляем соответствующий элемент в массив результатов и удаляем его из копии исходного массива;
     * Повторяем это действие до тех пор, пока исходный массив не станет пустым
     * @param  {Array} arr - исходный массив
     * @return  {Array} - получившийся массив
     */
    shuffleArray: function (arr) {

      var tempArr = [];

      while (arr.length > 0) {
        tempArr.push(arr.splice(window.helpers.getRandomInt(arr), 1)[0]);
      }

      tempArr.push(arr[0]);
      return tempArr;
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
