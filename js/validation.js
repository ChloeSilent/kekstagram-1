'use strict';

(function () {
  // перечисление для ХэшТэгов
  var Hashtag = {
    MAX_COUNT: 5,
    STARTING_SYMBOL: '#',
    MAX_LENGTH: 20,
    MIN_LENGTH: 2
  };

  /**
   * При неверном заполнении элемента - показываем данную функцию
   * @param  {Node} element - неправильно заполненное поле формы
   * @param  {string} message - сообщение пользователю, указывающее на неверно заполненное поле
   */
  var setErrorState = function (element, message) {
    element.style.borderColor = 'red';
    element.style.borderWidth = '4px';
    element.setCustomValidity(message);
  };
  /**
   * Функиця, кот. будет отрабатывать, если поле формы заполнено верно
   * @param  {Node} element - верно заполенное поле
   */
  var setSuccessInput = function (element) {
    element.style.borderColor = 'yellow';
    element.setCustomValidity('');
  };

  var hashTagsElement = document.querySelector('.text__hashtags'); // поле для ввода ХэшТэегов
  // var description = document.querySelector('.text__description'); // поле для ввода комментария

  var checkSimilarHashtags = function (arr, item) {
    return arr.reduce(function (acc, elem) {
      return elem.toLowerCase() === item.toLowerCase() ? acc + 1 : acc;
    }, 0) !== 1;
  };

  var onHashTagInput = function (evt) {
    var hashtags = evt.currentTarget.value.toLowerCase().split(' ');

    if (hashtags.length > Hashtag.MAX_COUNT) {
      setErrorState(evt.target, 'Максимальное число ХэшТегов - ' + Hashtag.MAX_COUNT);
      return;
    } else {
      setSuccessInput(evt.target);
    }

    hashtags.forEach(function (hashtag) {
      if (hashtag.indexOf(Hashtag.STARTING_SYMBOL) !== 0) {
        setErrorState(evt.target, 'ХэшТег должен начинаться со знака #');
      } else if (checkSimilarHashtags(hashtags, hashtag)) {
        setErrorState(evt.target, 'ХэшТеги не должны повторяться!');
      } else if (hashtag.length > Hashtag.MAX_LENGTH) {
        setErrorState(evt.target, 'Максимальная длина ХэшТега - ' + Hashtag.MAX_LENGTH + ' символов');
      } else if (hashtag.length < Hashtag.MIN_LENGTH) {
        setErrorState(evt.target, 'ХэшТег не может содержать только решётку');
      } else if (hashtag.lastIndexOf(Hashtag.STARTING_SYMBOL) !== 0) {
        setErrorState(evt.target, 'ХэшТеги должны разделяться пробелами');
      } else {
        setSuccessInput(evt.target);
      }
    });
  };

  hashTagsElement.addEventListener('input', onHashTagInput);

  window.validation = {
    onHashTagInput: onHashTagInput
  };
})();
