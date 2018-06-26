'use strict';

(function () {
  var SCALE_DEFAULT_VALUE = 100; // изначальный уровень применения эффекта

  var effectControls = document.querySelectorAll('.effects__radio');
  var scaleElement = document.querySelector('.img-upload__scale');
  var scaleLineElement = document.querySelector('.scale__line');
  var scaleLevelElement = document.querySelector('.scale__level');
  var scalePinControl = document.querySelector('.scale__pin');
  var scaleValueElement = document.querySelector('.scale__value');
  var imagePreviewImage = document.querySelector('.img-upload__preview img');

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

  var applyEffect = function (toDefault) {
    var currentEffect = document.querySelector('.effects__radio:checked').value;

    if (currentEffect === 'none') {
      scaleElement.classList.add('hidden');
    } else if (scaleElement.classList.contains('hidden')) {
      scaleElement.classList.remove('hidden');
    }

    if (toDefault) {
      var leftPositon = scaleLineElement.getBoundingClientRect().left;
      var rightPositon = scaleLineElement.getBoundingClientRect().right;

      scalePinControl.style.left = rightPositon - leftPositon + 'px';
      scaleLevelElement.style.width = rightPositon - leftPositon + 'px';
      scaleValueElement.value = calcEffectScale();
    }

    imagePreviewImage.className = effectsMap[currentEffect].className;
    imagePreviewImage.style.filter = effectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

  var calcEffectScale = function () {
    var maxValue = scaleLineElement.offsetWidth;
    var currentValue = scaleLevelElement.offsetWidth;
    return Math.round(currentValue / maxValue * SCALE_DEFAULT_VALUE);
  };

  var onScalePinControlMousedown = function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var linePosition = scaleLineElement.getBoundingClientRect();
    var leftBorder = linePosition.left;
    var rightBorder = linePosition.right;

    var onScalePinControlMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX < leftBorder || moveEvt.clientX > rightBorder) {
        return;
      }

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      scalePinControl.style.left = (scalePinControl.offsetLeft - shiftX) + 'px';
      scaleLevelElement.style.width = (scaleLevelElement.offsetWidth - shiftX) + 'px';

      scaleValueElement.value = calcEffectScale();
      // console.log(scaleValueElement.value);
      applyEffect();
    };

    var onScalePinControlMouseup = function (upEvt) {
      upEvt.preventDefault();

      scaleValueElement.value = calcEffectScale();
      applyEffect();

      document.removeEventListener('mousemove', onScalePinControlMousemove);
      document.removeEventListener('mouseup', onScalePinControlMouseup);
    };

    document.addEventListener('mousemove', onScalePinControlMousemove);
    document.addEventListener('mouseup', onScalePinControlMouseup);
  };

  var onEffectControlChange = function () {
    applyEffect(true);
  };

  scalePinControl.addEventListener('mousedown', onScalePinControlMousedown);

  effectControls.forEach(function (control) {
    control.addEventListener('change', onEffectControlChange);
  });

  window.effects = {
    applyEffect: applyEffect
  };

})();
