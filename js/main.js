'use strict';

(function () {
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');

  var imageUploadForm = document.querySelector('.img-upload__form');

  var showImageUploadElement = function () {
    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);

    window.resize.setDefaultSize();
    window.effects.applyEffect(true);
  };

  var hideImageUploadElement = function () {
    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);
    uploadFileElement.value = '';
  };

  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  var onUploadFileEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCodes.ESC &&
      evt.target !== document.querySelector('.text__hashtags') &&
      evt.target !== document.querySelector('.text__description')) {
      hideImageUploadElement();
    }
  };

  var onSubmitImageUplodadForm = function (evt) {
    evt.preventDefault();
    if (imageUploadForm.reportValidity()) {
      imageUploadForm.submit();
    }
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancedElement.addEventListener('click', onUploadCancelClick);

  imageUploadForm.addEventListener('submit', onSubmitImageUplodadForm);
})();
