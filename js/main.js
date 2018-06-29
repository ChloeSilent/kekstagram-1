'use strict';

(function () {
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');

  var imageUploadForm = document.querySelector('.img-upload__form');

  var showImageUploadElement = function () {

    if (!window.loadUserFile(uploadFileElement)) {
      return;
    }

    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);

    window.resize.setDefaultSize();
    window.effects.applyEffect(true);
  };

  var hideImageUploadElement = function () {
    window.helpers.toggleOverlay(imageUploadElement, onUploadFileEscPress);
    uploadFileElement.value = '';
    imageUploadForm.reset();
    window.effects.applyEffect();
    // window.validation.onHashTagInput();
  };

  var showUploadErrorBlock = function () {
    document.querySelector('.img-upload__message--error').classList.remove('hidden');
  };

  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  var onUploadFileEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCode.ESC &&
      evt.target !== document.querySelector('.text__hashtags') &&
      evt.target !== document.querySelector('.text__description')) {
      hideImageUploadElement();
    }
  };

  var onSubmitImageUplodForm = function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      imageUploadForm.reset();
      hideImageUploadElement();
    };

    var onError = function () {
      hideImageUploadElement();
      showUploadErrorBlock();
    };

    if (imageUploadForm.reportValidity()) {
      var formData = new FormData(imageUploadForm);
      // imageUploadForm.submit();
      window.backend.sendData(formData, onLoad, onError);
    }
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancedElement.addEventListener('click', onUploadCancelClick);

  imageUploadForm.addEventListener('submit', onSubmitImageUplodForm);
})();
