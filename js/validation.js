'use strict';

(function () {
  // перечисление правил ограничения ввода ХэшТэгов
  var Hashtag = {
    MAX_COUNT: 5,
    STARTING_SYMBOL: '#',
    MAX_LENGTH: 20,
    MIN_LENGTH: 2
  };

  // перечисление ошибок, возникающих при неверном вводе ХэшТэгов
  var Error = {
    MAX_COUNT: 'Максимальное число ХэшТегов - ' + Hashtag.MAX_COUNT,
    FIRST_SYMBOL: 'Хэш-тег должен начинается с символа # (решётка)',
    IDENTICAL_TAGS: 'Хэш-теги не должны повторяться!',
    MAX_LENGTH_OF_ONE_TAG: 'Максимальная длина ХэшТега - ' + Hashtag.MAX_LENGTH + ' символов',
    MIN_LENGTH_OF_ONE_TAG: 'ХэшТег не может содержать только решётку',
    LACK_OF_SPACE: 'ХэшТеги должны разделяться пробелами'
  };

  var hashTagsElement = document.querySelector('.text__hashtags'); // поле для ввода ХэшТэегов
  // var description = document.querySelector('.text__description'); // поле для ввода комментария

  /**
   * При неверном заполнении элемента - показываем данную функцию
   * @param  {string} message - сообщение пользователю, указывающее на неверно заполненное поле
   */
  var setErrorState = function (message) {
    hashTagsElement.style.border = '4px solid rgba(255, 3, 62)';
    hashTagsElement.setCustomValidity(message);
  };

  /**
   * Функиця, кот. будет отрабатывать, если поле формы заполнено верно
   */
  var setSuccessInput = function () {
    hashTagsElement.style.borderColor = 'yellow';
    hashTagsElement.setCustomValidity('');
  };

  var validateHashTagsField = function () {
    var hashtags = hashTagsElement.value.trim(); // очищаем оконечные пробелы
    hashtags = hashTagsElement.value.toLowerCase().split(' ').filter(function (item) {
      return item;
    });

    if (hashtags.length > Hashtag.MAX_COUNT) {
      setErrorState(Error.MAX_COUNT);
      return;
    }

    hashtags.every(function (tag, index) {
      if (tag.indexOf(Hashtag.STARTING_SYMBOL) !== 0) {
        setErrorState(Error.FIRST_SYMBOL);
        return false;
      } else if (hashtags.includes(tag, index + 1)) {
        setErrorState(Error.IDENTICAL_TAGS);
        return false;
      } else if (tag.length > Hashtag.MAX_LENGTH) {
        setErrorState(Error.MAX_LENGTH_OF_ONE_TAG);
        return false;
      } else if (tag.length < Hashtag.MIN_LENGTH) {
        setErrorState(Error.MIN_LENGTH_OF_ONE_TAG);
        return false;
      } else if (tag.lastIndexOf(Hashtag.STARTING_SYMBOL) !== 0) {
        setErrorState(Error.LACK_OF_SPACE);
        return false;
      } else {
        setSuccessInput();
        return true;
      }
    });
  };

  var onHashTagsInput = function (evt) {
    if (evt.target === hashTagsElement) {
      validateHashTagsField();
    }
    evt.preventDefault();
  };

  hashTagsElement.addEventListener('input', onHashTagsInput);
  // hashTagsElement.addEventListener('blur', function (evt) {
  //   if (evt.target !== hashTagsElement) {
  //     validateHashTagsField();
  //     hashTagsElement.checkValidity();
  //   }
  // }, true);

  window.validation = {
    setSuccessInput: setSuccessInput
  };
})();
