'use strict';

(function () {

  var NewPhotos = {
    MIN: 0,
    MAX: 10
  }; // 10 случайных, не повторяющихся фотографий

  var ACTIVE_CLASS = 'img-filters__button--active';

  var sortsBlock = document.querySelector('.img-filters');
  var sortsControls = sortsBlock.querySelectorAll('.img-filters__button');

  // фильтры для фоток (Популярные — фотографии в изначальном порядке.
  // Новые — 10 случайных, не повторяющихся фотографий.
  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев)
  var SortFunctions = {
    'filter-popular': function (data) {
      return data;
    },
    'filter-new': function (data) {
      var miniData = window.helpers.shuffleArray(data).slice(NewPhotos.MIN, NewPhotos.MAX);
      return miniData;
    },
    'filter-discussed': function (data) {
      return data.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  };

  /**
   * Сортируем фотки согласно нашим фильтрам
   * @param  {Array} data - массив с данными (объектами)
   * @param  {cb} cb - функция-коллбэк, переключает фильтры по активному классу
   */
  var sortPhotos = function (data, cb) {
    var sortName = sortsBlock.querySelector('.' + ACTIVE_CLASS).id;
    var result = SortFunctions[sortName](data.slice());
    cb(result);
  };

  /**
   * Удаляем класс active
   */
  var clearActivity = function () {
    sortsControls.forEach(function (item) {
      item.classList.remove(ACTIVE_CLASS);
    });
  };

  /**
   * Полная сорировка фотографий, с добавлением обработчика событий
   * @param  {Array} data - массив фоток
   * @param  {cb} cb - функция-коллбэк
   */
  var showSorts = function (data, cb) {
    sortsBlock.classList.remove('img-filters--inactive');

    sortsControls.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.classList.contains(ACTIVE_CLASS)) {
          return;
        }

        clearActivity();
        evt.target.classList.add(ACTIVE_CLASS);
        window.debounce(function () {
          sortPhotos(data, cb);
        });
      });
    });
  };

  window.showSorts = showSorts;
})();
