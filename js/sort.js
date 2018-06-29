'use strict';

(function () {

  var NewPhotos = {
    MIN: 0,
    MAX: 10
  }; // 10 случайных, не повторяющихся фотографий

  var ACTIVE_CLASS = 'img-filters__button--active';

  var sortsBlock = document.querySelector('.img-filters');
  var sortsControls = sortsBlock.querySelectorAll('.img-filters__button');

  var SortFunctions = {
    'filter-popular': function (data) {
      return data;
      // return data.sort(function (a, b) {
      //   return b.likes - a.likes;
      // });
    },
    'filter-new': function (data) {
      // return window.helpers.shuffleArray(data);
      var miniData = window.helpers.shuffleArray(data).slice(NewPhotos.MIN, NewPhotos.MAX);
      return miniData;
      // return data.reverse();
    },
    'filter-discussed': function (data) {
      return data.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  };

  var sortPhotos = function (data, cb) {
    var sortName = sortsBlock.querySelector('.' + ACTIVE_CLASS).id;
    var result = SortFunctions[sortName](data.slice());
    cb(result);
  };

  var clearActivity = function () {
    sortsControls.forEach(function (item) {
      item.classList.remove(ACTIVE_CLASS);
    });
  };

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
