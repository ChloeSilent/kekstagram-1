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
     * Вспомогательная функция для сортировки массива в произвольном порядке
     * @return {integer} - псевдослучайное число из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1)
     */
    compareRandomElements: function () {
      return Math.random() - 0.5;
    },

    /**
     * Генерируем комментарии случайным образом, для каждого комментария берем 1 или 2 строки из массива COMMENTS
     * @param {Array} initialArray - массив с изначальными данными
     * @return {Array} - массив с одним или двумя комментариями
     */
    generateComment: function (initialArray) {
      var commentsCopy = initialArray.slice();
      commentsCopy.sort(this.compareRandomElements);

      var commentsSmallCopy = commentsCopy.slice(0, this.getRandomNumber(1, 2));
      return commentsSmallCopy;
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
