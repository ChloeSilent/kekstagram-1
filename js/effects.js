'use strict';

(function () {
  var SCALE_DEFAULT_VALUE = 100; // изначальный уровень применения эффекта

  var effectControlElements = document.querySelectorAll('.effects__radio');
  var scaleElement = document.querySelector('.img-upload__scale');
  var scaleLineElement = document.querySelector('.scale__line');
  var scaleLevelElement = document.querySelector('.scale__level');
  var scalePinControlElement = document.querySelector('.scale__pin');
  var scaleValueElement = document.querySelector('.scale__value');
  var imagePreviewElement = document.querySelector('.img-upload__preview img');

  // имеющиеся эффекты
  var effectsMap = {
    none: {
      className: '',
      calcFilterValue: function () {
        return null;
      }
    },
    chrome: {
      className: 'effects__preview--chrome',
      calcFilterValue: function (value) {
        return 'grayscale(' + value / SCALE_DEFAULT_VALUE + ')';
      }
    },
    sepia: {
      className: 'effects__preview--sepia',
      calcFilterValue: function (value) {
        return 'sepia(' + value / SCALE_DEFAULT_VALUE + ')';
      }
    },
    marvin: {
      className: 'effects__preview--marvin',
      calcFilterValue: function (value) {
        return 'invert(' + value + '%)';
      }
    },
    phobos: {
      className: 'effects__preview--phobos',
      calcFilterValue: function (value) {
        return 'blur(' + value / SCALE_DEFAULT_VALUE * 3 + 'px)';
      }
    },
    heat: {
      className: 'effects__preview--heat',
      calcFilterValue: function (value) {
        return 'brightness(' + (1 + value / SCALE_DEFAULT_VALUE * 2) + ')';
      }
    }
  };

  /**
   * Находим значение value у элемента с классом .scale__value
   * @return {integer} - значение value
   */
  var calcEffectScale = function () {
    var maxValue = scaleLineElement.offsetWidth;
    var currentValue = scaleLevelElement.offsetWidth;
    return Math.round(currentValue / maxValue * SCALE_DEFAULT_VALUE);
  };

  /**
   * Изменяем выбор эффекта по умолчанию; удаляем слайдер насыщщености у эффекта по умолчанию;
   * выставляем насыщщеность эффекта на максимум; добалвяем возможность переключать фильтры
   * @param  {boolean} toDefault - ставим насыщенность эффекта и ползунок слайдера по умолчанию (на максимум) - если true)
   */
  var setDefaultEffectSettings = function (toDefault) {
    document.querySelector('input[id="effect-none"]').setAttribute('checked', 'checked');
    document.querySelector('input[id="effect-heat"]').removeAttribute('checked');

    var currentEffect = document.querySelector('.effects__radio:checked').value;

    if (currentEffect === 'none') {
      scaleElement.classList.add('hidden');
    } else if (scaleElement.classList.contains('hidden')) {
      scaleElement.classList.remove('hidden');
    }

    if (toDefault) {
      var leftPositon = scaleLineElement.getBoundingClientRect().left;
      var rightPositon = scaleLineElement.getBoundingClientRect().right;

      scalePinControlElement.style.left = rightPositon - leftPositon + 'px';
      scaleLevelElement.style.width = rightPositon - leftPositon - scalePinControlElement.offsetWidth / 2 + 'px';
      scaleValueElement.value = calcEffectScale();
    }

    imagePreviewElement.className = effectsMap[currentEffect].className;
    imagePreviewElement.style.filter = effectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

  // добавляем подвижность слайдеру насыщенности эффекта

  /**
   * Функция перемещения контрола слайдера с классом scale__pin по оси Х
   * @param  {Object} evt - объект события
   */
  var onScalePinControlMousedown = function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var linePosition = scaleLineElement.getBoundingClientRect();
    var leftBorder = linePosition.left;
    var rightBorder = linePosition.right;

    /**
     * Перемещаем контрол слайдера на определенное расстояние
     * @param  {Object} moveEvt - объект события mousemove
     */
    var onScalePinControlMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX < leftBorder || moveEvt.clientX > rightBorder) {
        return;
      }

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      scalePinControlElement.style.left = (scalePinControlElement.offsetLeft - shiftX) + 'px';
      scaleLevelElement.style.width = (scaleLevelElement.offsetWidth - shiftX) + 'px';

      scaleValueElement.value = calcEffectScale();
      setDefaultEffectSettings();
    };

    /**
     * Отпускаем перетасикваемый объект (контрол слайдера), отписываемся от обработчиков mousemove и mouseup
     * @param  {Object} upEvt - объект события mouseup
     */
    var onScalePinControlMouseup = function (upEvt) {
      upEvt.preventDefault();

      scaleValueElement.value = calcEffectScale();
      setDefaultEffectSettings();

      document.removeEventListener('mousemove', onScalePinControlMousemove);
      document.removeEventListener('mouseup', onScalePinControlMouseup);
    };

    document.addEventListener('mousemove', onScalePinControlMousemove);
    document.addEventListener('mouseup', onScalePinControlMouseup);
  };

  /**
   * Изменяем насыщенность эффекта при перемещении ползунка слайдера
   */
  var onEffectControlChange = function () {
    setDefaultEffectSettings(true);
  };

  scalePinControlElement.addEventListener('mousedown', onScalePinControlMousedown);

  effectControlElements.forEach(function (control) {
    control.addEventListener('change', onEffectControlChange);
  });

  window.setDefaultEffectSettings = setDefaultEffectSettings;

})();
