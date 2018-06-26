'use strict';

(function () {
  var picturesList = document.querySelector('.pictures'); // место для отрисовки сгенерированных фоток
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link'); // шаблон, из которого мы берем прототип нашей фотки

  var renderPictureElement = function (photo, clickHandler) {
    var pictureElement = photoTemplate.cloneNode(true);

    var pictureImage = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__stat--likes');
    var pictureComents = pictureElement.querySelector('.picture__stat--comments');

    pictureElement.dataset.id = photo.id;
    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComents.textContent = photo.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      clickHandler(photo);
    });
    return pictureElement;
  };

  var pictureClickHandler = window.preview.showBigPictureElement;

  var insertPhotos = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (photo) {
      var pictureElement = renderPictureElement(photo, pictureClickHandler);
      fragment.appendChild(pictureElement);
    });
    return fragment;
  };

  var randomPhotosSet = window.data.createArrayOfPhotos;
  var photosSetFragment = insertPhotos(randomPhotosSet);

  picturesList.appendChild(photosSetFragment);
})();
