'use strict';

(function () {
  var picturesList = document.querySelector('.pictures'); // место для отрисовки сгенерированных фоток
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link'); // шаблон, из которого мы берем прототип нашей фотки

  var renderPictureElement = function (photo, cb) {
    var pictureElement = photoTemplate.cloneNode(true);

    var pictureImage = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__stat--likes');
    var pictureComments = pictureElement.querySelector('.picture__stat--comments');

    // pictureElement.dataset.id = photo.id; // спросить про id
    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      cb(photo);
    });
    return pictureElement;
  };

  var insertPhotos = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element) {
      var pictureElement = renderPictureElement(element, function (photo) {
        window.preview.showBigPictureElement(photo);
      });
      fragment.appendChild(pictureElement);
    });
    return fragment;
  };

  var loadNewPictures = function (data) {
    var photosFragment = insertPhotos(data);

    document.querySelectorAll('.picture__link').forEach(function (link) {
      link.parentNode.removeChild(link);
    });

    picturesList.appendChild(photosFragment);
  };

  var onLoad = function (data) {
    loadNewPictures(data);
    window.showSorts(data, loadNewPictures);
  };

  var onError = function (err) {
    window.showErrorMessage(err);
  };

  window.backend.downloadData(onLoad, onError);

  // var randomPhotosSet = window.data.createArrayOfPhotos;
  // var photosSetFragment = insertPhotos(randomPhotosSet);

  // picturesList.appendChild(photosSetFragment);
})();
