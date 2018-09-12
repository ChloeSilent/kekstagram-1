'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png']; // форматы файлов для загрузки

  var imagePreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewElements = document.querySelectorAll('.effects__preview');

  /**
   * устанавливаем верный photoSrc для загружаемой картинки, которая хранится в imagePreviewElement
   * @param  {string} photoSrc - адрес загружаемого файла
   */
  var changePreviewImages = function (photoSrc) {
    imagePreviewElement.src = photoSrc;

    effectsPreviewElements.forEach(function (element) {
      element.style.backgroundImage = 'url(' + photoSrc + ')';
    });
  };

  /**
   * Загружаем файл в поле с id="upload-file" через метод files,
   * проверяем его формат, по окончании загрузки читаем его содержимое через fileReader
   * @param  {Object} uploadFileElement - загружаемый пользователем файл
   * @return {boolean} true - при успешной загрузке,
   * false - при неверном формате файла, + показываем ошибку
   */
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

    reader.readAsDataURL(file); // Запускаем процесс чтения данных указанного Blob, по завершении процесса,
    // аттрибут result будет содержать данные файла в виде data: URL

    return true;
  };

  window.loadUserFile = loadUserFile;
})();
