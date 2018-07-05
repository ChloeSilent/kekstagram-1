'use strict';

(function () {
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');

  var imageUploadFormElement = document.querySelector('.img-upload__form');

  /**
   * Показываем загруженный пользователем файл, ставим масштаб файла + эффект по умолчанию
   */
  var showImageUploadElement = function () {

    if (!window.loadUserFile(uploadFileElement)) {
      return;
    }

    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);

    window.setDefaultSize();
    window.setDefaultEffectSettings(true);
  };

  /**
   * Прячем popup с загрузкой нового файла, делаем reset формы
   */
  var hideImageUploadElement = function () {
    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);
    uploadFileElement.value = '';
    imageUploadFormElement.reset();
    window.setSuccessInput();
  };

  /**
   * Показываем popup загрузки нового файла
   */
  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  /**
   * Функция-обработчик события, отменяющая загрузку нового файла и закрывающая popup с загрузкой
   */
  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  /**
   * Обработчик события, закрывающий загрузку файла при нажатии на ESC
   * (не сработает, когда в фокусе находятся поле ввода ХэшТэгов и поле добаления комментария)
   * @param  {Object} evt - объект события
   */
  var onUploadFileEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCode.ESC &&
      evt.target !== document.querySelector('.text__hashtags') &&
      evt.target !== document.querySelector('.text__description')) {
      hideImageUploadElement();
    }
  };

  /**
   * Функция-Обработчик отправки формы;
   * Отменяем действие формы по умолчанию, отправляем данные формы через XHR;
   * При успешной загрузке данных на сервер - закрываем окно редактирования фотографии
   * (которую загрузил пользователь) и сбрасываем значения формы на значения по умолчанию;
   * При ошибке - закрываем окно редактирования фотографии и показываем блок ошибки загрузки файла
   * @param  {Object} evt - объект события
   */
  var onSubmitImageUplodForm = function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      imageUploadFormElement.reset();
      hideImageUploadElement();
      window.message.showSuccess('Данные успешно отправлены!');
    };

    var onError = function (errorText) {
      hideImageUploadElement();
      window.message.showError(errorText);
    };

    if (imageUploadFormElement.reportValidity()) {
      var formData = new FormData(imageUploadFormElement);

      window.backend.sendData(formData, onLoad, onError);
    }
  };

  // вешаем обработчики событий
  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancelElement.addEventListener('click', onUploadCancelClick);

  imageUploadFormElement.addEventListener('submit', onSubmitImageUplodForm);
})();
