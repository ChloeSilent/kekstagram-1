'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsPreviews = document.querySelectorAll('.effects__preview');

  var changePreviewImages = function (photoSrc) {
    imagePreview.src = photoSrc;

    effectsPreviews.forEach(function (element) {
      element.style.backgroundImage = 'url(' + photoSrc + ')';
    });
  };

  var loadUserFile = function (uploadFileElement) {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (!matches) {
      window.showErrorMessage('неверный формат файла');
      return false;
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      changePreviewImages(reader.result);
    });

    reader.readAsDataURL(file);
    return true;
  };

  window.loadUserFile = loadUserFile;
})();
