'use strict';

(function () {
  // Перечисление для уровня масштаба
  var Resize = {
    DEFAULT_VALUE: 100,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  // изменение масштаба фотки
  var resizeControlPanel = document.querySelector('.img-upload__resize');
  var resizeControlEl = document.querySelector('.resize__control--value');
  var imagePreviewElement = document.querySelector('.img-upload__preview');

  /**
   * Масштабируем загружаемое изображение с шагом в 25%
   * @param {Object} evt - объект события, по которому мы определяем на какую кнопку (на + или -) нажал пользователь
   */
  var onResizeControlClick = function (evt) {
    var currentValue = parseInt(resizeControlEl.value, 10);

    if (evt.target.classList.contains('resize__control--minus')) {
      if (currentValue > Resize.MIN) {
        currentValue -= Resize.STEP;
      }
    } else if (evt.target.classList.contains('resize__control--plus')) {
      if (currentValue < Resize.MAX) {
        currentValue += Resize.STEP;
      }
    }

    var scale = 'scale' + '(' + (currentValue / Resize.DEFAULT_VALUE) + ')';
    imagePreviewElement.style.transform = scale;
    resizeControlEl.value = currentValue + '%';
  };

  var setDefaultSize = function () {
    resizeControlEl.value = Resize.DEFAULT_VALUE + '%';
    imagePreviewElement.style.transform = null;
  };

  resizeControlPanel.addEventListener('click', onResizeControlClick, true);

  window.resize = {
    setDefaultSize: setDefaultSize
  };
})();
