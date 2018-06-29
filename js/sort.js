'use strict';

(function () {

  var ACTIVE_CLASS = 'img-filters__button--active';

  var sortsBlock = document.querySelector('.img-filters');
  var sortsControls = sortsBlock.querySelectorAll('.img-filters__button');

  var SortFunctions = {
    'filter-recomended': function (data) {
      return data;
    },
    'filter-popular': function (data) {
      return data.sort(function (a, b) {
        return b.likes - a.likes;
      });
    },
    'filter-discussed': function (data) {
      return data.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
    'filter-random': function (data) {
      return window.util.shuffleArray(data);
    }
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
