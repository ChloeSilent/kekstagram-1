'use strict';

(function () {
  var picturesListElement = document.querySelector('.pictures'); // место для отрисовки сгенерированных фоток
  var photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture__link'); // шаблон, из которого мы берем прототип нашей фотки

  /**
   * Создаем DOM-элементы для фоток, заполняем их данными
   * @param  {Object} photo - обьект для заполнения данными
   * @param  {cb} cb - функция коллбэк - обработчик события, открывающий полную версию фото
   * @return {Object} - обьект с заполненными данными
   */
  var renderPictureElement = function (photo, cb) {
    var pictureElement = photoTemplateElement.cloneNode(true);

    var pictureImageElement = pictureElement.querySelector('.picture__img');
    var pictureLikesElement = pictureElement.querySelector('.picture__stat--likes');
    var pictureCommentsElement = pictureElement.querySelector('.picture__stat--comments');

    pictureImageElement.src = photo.url;
    pictureLikesElement.textContent = photo.likes;
    pictureCommentsElement.textContent = photo.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      cb(photo);
    });
    return pictureElement;
  };

  /**
   * Вставляем подготовленный шаблон с данными во fragment
   * @param  {Array} data - массив данных (массив фоток)
   * @return {Node} - фрагмент с заполненным данными шаблоном, который мы вставляем в разметку через метод createDocumentFragment()
   */
  var insertPhotos = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element) {
      var pictureElement = renderPictureElement(element, function (photo) {
        window.showBigPictureElement(photo);
      });
      fragment.appendChild(pictureElement);
    });
    return fragment;
  };

  /**
   * Вставляем шаблон с заполненными данными на страницу в разметку в блок с классом .pictures,
   * при этом удаляем лишние данные (а именно элемент с классом .picture__stats)
   * @param  {Array} data - массив данных (массив фоток)
   */
  var loadNewPictures = function (data) {
    var photosFragment = insertPhotos(data);

    document.querySelectorAll('.picture__link').forEach(function (link) {
      link.parentNode.removeChild(link);
    });

    picturesListElement.appendChild(photosFragment);
  };

  /**
   * Функция загрузки данных с сервера через XHR
   * @param  {Array} data - массив данных (массив фотографий)
   */
  var onLoad = function (data) {
    loadNewPictures(data);
    window.showSorts(data, loadNewPictures);
  };

  /**
   * В случае провала загрузки данных - показываем сообщение об ошибке
   * @param  {string} text - текст сообщения
   */
  var onError = function (text) {
    window.message.showError(text);
  };

  window.backend.downloadData(onLoad, onError);
})();
