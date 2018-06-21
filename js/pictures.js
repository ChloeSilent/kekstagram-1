'use strict';

var NUMBER_OF_OBJECTS = 25; // нужное кол-во объектов

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MAX_AVATARS = 6;

// Перечисление для уровня масштаба
var Resize = {
  DEFAULT_VALUE: 100,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var SCALE_DEFAULT_VALUE = 100; // изначальный уровень применения эффекта

// перечисление для ХэшТэгов
var Hashtag = {
  MAX_COUNT: 5,
  STARTING_SYMBOL: '#',
  MAX_LENGTH: 20
};

var KeyCodes = {
  ESC: 27,
  ENTER: 13
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

/**
 * Функция генерации случайного числа
 * @param {integer} min - номер первого элемента из массива
 * @param {integer} max - номер последнего элемента из массива - не включая это значение
 * @return {integer} - номер случайного элемента из массива
 */
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
 * Вспомогательная функция для сортировки массива в произвольном порядке
 * @return {integer} - псевдослучайное число из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1)
 */
var compareRandomElements = function () {
  return Math.random() - 0.5;
};

/**
 * Генерируем комментарии случайным образом, для каждого комментария берем 1 или 2 строки из массива COMMENTS
 * @return {Array} - массив с одним или двумя комментариями
 */
var generateComment = function () {
  var commentsCopy = COMMENTS.slice();
  commentsCopy.sort(compareRandomElements);

  var commentsSmallCopy = commentsCopy.slice(0, getRandomNumber(1, 2));
  return commentsSmallCopy;
};

/**
 * Создаем объект через функцию конструктор
 * @constructor
 * @param {integer} n - текущий номер объекта
 */
var PhotoDescription = function (n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
  this.comments = generateComment(COMMENTS);
  this.description = DESCRIPTION[getRandomNumber(0, DESCRIPTION.length)];
};

/**
 * Создаем массив однотипных объектов
 * @param {Object} ObjectSample - объект-прототип, на основе которого будут сгенерированы остальные объекты
 * @param {integer} count - количество объектов для генерации
 * @return {Array} - массив из n-ого кол-ва сгенерированных объектов
 */
var createArrayOfPhoto = function (ObjectSample, count) {
  var photos = []; // массив для описания фоток
  for (var i = 0; i < count; i++) {
    photos.push(new ObjectSample(i));
  }
  return photos;
};

/**
 * Cоздаем DOM-элементы, заполняем их данными
 * @param {Object} photo - объект для изменения данных
 * @return {Node} - нужный нам шаблон с измененными данными
 */
var createPictureElements = function (photo) {
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link'); // искомый шаблон и нужный элемент в нем
  var pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.lengt;
  pictureElement.dataset.id = photo.id;

  pictureElement.addEventListener('click', renderBigPicture(photo));

  return pictureElement;
};

/**
 * Отрисовываем сгенерированные DOM-элементы на странице
 * @param {Array} arrayOfObjects - массив из нужного кол-ва объектов
 * @param {Node} parentNode - блок для вставки на страницу сгенерированных DOM-элементов
*/
var insertPhotos = function (arrayOfObjects, parentNode) {
  var fragment = document.createDocumentFragment();
  arrayOfObjects.forEach(function (element) {
    fragment.appendChild(createPictureElements(element));
  });

  parentNode.appendChild(fragment);
};

var bigPicture = document.querySelector('.big-picture');
var bigPictureBtnClose = bigPicture.querySelector('.big-picture__cancel'); // кнопка закрытия большой фотки

/**
 * Разворачиваем полную версию фотографии с комментариями и описанием
 * @param {Object} photo - объект, на основе которого будут изменяться данные
 */
var setupBigPicture = function (photo) {
  bigPicture.classList.remove('hidden'); // показываем большое фото
  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
};

// Удаляем старые комментарии
var removeOldComments = function () {
  var pictureComments = bigPicture.querySelector('.social__comments');
  var removedComments = bigPicture.querySelectorAll('.social__comment');
  removedComments.forEach(function (oldcomment) {
    pictureComments.removeChild(oldcomment);
  });
};

/**
 * Добавляем комментарии к большой фотке
 * @param {Object} photo - любой объект из сгенерированного массива
 */
var addComments = function (photo) {
  photo.comments.forEach(function (comment) {
    var pictureComments = bigPicture.querySelector('.social__comments');

    var pictureComment = document.createElement('li');
    pictureComment.classList.add('social__comment');
    pictureComments.appendChild(pictureComment);

    var pictureCommentImg = document.createElement('img');
    pictureCommentImg.classList.add('social__picture');
    pictureCommentImg.src = 'img/avatar-' + getRandomNumber(1, MAX_AVATARS) + '.svg';
    pictureCommentImg.alt = 'Аватар комментатора фотографии';
    pictureCommentImg.width = 35;
    pictureCommentImg.height = 35;
    pictureComment.appendChild(pictureCommentImg);

    var pictureCommentText = document.createElement('p');
    pictureCommentText.classList.add('social__text');
    pictureCommentText.textContent = comment;
    pictureComment.appendChild(pictureCommentText);
  });
};

/**
 * Прячем блок счётчика комментариев и блок загрузки новых комментариев
 */
var hideCommentsElements = function () {
  var social = bigPicture.querySelector('.social');
  social.querySelector('.social__loadmore').classList.add('visually-hidden');
  social.querySelector('.social__comment-count').classList.add('visually-hidden');
};

/**
 * Отрисовываем полную версию фотографии с комментариями
 * @param {Object} photo - первое фото из массива
 */
var renderBigPicture = function (photo) {
  setupBigPicture(photo);
  removeOldComments();
  addComments(photo);
  hideCommentsElements();
};

// вызываем главные функции
var picturesList = document.querySelector('.pictures'); // место для отрисовки сгенерированных фоток
var readyPhotos = createArrayOfPhoto(PhotoDescription, NUMBER_OF_OBJECTS); // создаем массив из n кол-ва объектов
insertPhotos(readyPhotos, picturesList); // добавляем данные DOM-элементы в нужное место на странице
// renderBigPicture(readyPhotos[0]); // Отрисовываем большую фотографию с комментариями и описанием

// Элементы загрузки новых фоток
var uploadFile = document.querySelector('#upload-file'); // инпут с типом file - элемент для загрузки изображения
var uploadCancel = document.querySelector('#upload-cancel'); // кнопка закрытия формы редактирования изображения
var imageUpload = document.querySelector('.img-upload__overlay'); // оверлэй для редактирования фото после ее загрузки

// панель применения эффектов к оверлэю
var effectControls = document.querySelectorAll('.effects__radio'); // радио-кнопки для выбора эффекта
var scalePin = document.querySelector('.scale__pin'); // ползунок регулирования интенсивности эффекта
var scaleValue = document.querySelector('.scale__value'); // Уровень эффекта - число от 0 до 100 - изначально 100
var imagePreviewImg = document.querySelector('.img-upload__preview img'); // картинка внутри .img-upload__preview
var imageSlider = document.querySelector('.img-upload__scale'); // сам слайдер

var togglePopup = function (popup) {
  popup.classList.toggle('hidden');
};

/**
 * Прячем большую фотку, если пользователь нажал верную клавишу на клавиатуре
 * @param  {Object} evt - объект event, нужен для определения клавиатурной клавиши, по которой нажал пользователь
 */
var bigPictureKeydownHandler = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    hideBigPicture();
  }
};

/**
 * Прячем большую фотку
 */
var showBigPicture = function () {
  togglePopup(bigPicture);
  document.addEventListener('keydown', bigPictureKeydownHandler);
};
/**
 * Показываем полное большое фото
 */
var hideBigPicture = function () {
  togglePopup(bigPicture);
  document.removeEventListener('keydown', bigPictureKeydownHandler);
};

var uploadCancelKeydownHandler = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    uploadCancelClickHandler();
  }
};

/**
 * Функция закрытия оверлэя с загруженным изображением
 */
var uploadCancelClickHandler = function () {
  togglePopup(imageUpload);
  document.removeEventListener('keydown', uploadCancelKeydownHandler);
  uploadFile.value = '';
};

// изменение масштаба фотки
var resizeControlPanel = document.querySelector('.img-upload__resize');
var resizeControlEl = document.querySelector('.resize__control--value');
// var imagePreview = document.querySelector('.img-upload__preview');

/**
 * Функция, открывающая оверлэй для загрузки изображения и работы над ним
 */
var uploadFileChangeClickHandler = function () {
  togglePopup(imageUpload);
  document.addEventListener('keydown', uploadCancelKeydownHandler);
  resizeControlPanel.addEventListener('click', onResizeControlClick, true);
  resizeControlEl.value = Resize.DEFAULT_VALUE + '%';
  scaleValue.value = SCALE_DEFAULT_VALUE;
};

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

  var scale = 'scale' + '(' + (currentValue / SCALE_DEFAULT_VALUE) + ')';
  imagePreviewImg.style.transform = scale;
  resizeControlEl.value = currentValue + '%';
};

// обработчики
uploadCancel.addEventListener('click', uploadCancelClickHandler);
uploadFile.addEventListener('change', uploadFileChangeClickHandler);

document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    showBigPicture(evt.target.src);
  }
});

bigPictureBtnClose.addEventListener('click', hideBigPicture);
bigPicture.addEventListener('keydown', bigPictureKeydownHandler);

// Словарь эффектов с названиями и значениями
var EffectsMap = {
  none: {
    className: '',
    calcFilterValue: function () {
      return null;
    }
  },
  chrome: {
    className: 'effects__preview--chrome',
    calcFilterValue: function (value) {
      return 'grayscale(' + value / 100 + ')';
    }
  },
  sepia: {
    className: 'effects__preview--sepia',
    calcFilterValue: function (value) {
      return 'sepia(' + value / 100 + ')';
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
      return 'blur(' + value / 100 * 3 + 'px)';
    }
  },
  heat: {
    className: 'effects__preview--heat',
    calcFilterValue: function (value) {
      return 'brightness(' + (1 + value / 100 * 2) + ')';
    }
  }
};

/**
 * Применяем эффект к фотке в зависимости от выбранного в списке эффектов ниже (с классом effects__item)
 */
var applyEffect = function () {
  var currentEffect = document.querySelector('.effects__radio:checked').value;
  imagePreviewImg.className = EffectsMap[currentEffect].className;
  imagePreviewImg.style.filter = EffectsMap[currentEffect].calcFilterValue(scaleValue.value);
  if (currentEffect === 'none') {
    imageSlider.classList.add('hidden');
  } else if (imageSlider.classList.contains('hidden')) {
    imageSlider.classList.remove('hidden');
  }
};

/**
 * Находим и возврщаем уровень эффекта
 * @return {integer} - значение уровня эффекта
 */
var calcEffectScale = function () {
  var scaleLineEl = document.querySelector('.scale__line');
  var scaleLevelEl = document.querySelector('.scale__level');
  var maxValue = scaleLineEl.offsetWidth;
  var currentValue = scaleLevelEl.offsetWidth - scalePin.offsetWidth / 2;
  return Math.round(currentValue / maxValue * 100);
};

var scalePinMouseupHandler = function () {
  scaleValue.value = calcEffectScale();
  applyEffect();
};

var effectsControlChangeHandler = function () {
  scaleValue.value = 100;
  applyEffect();
};

scalePin.addEventListener('mouseup', scalePinMouseupHandler);

effectControls.forEach(function (control) {
  control.addEventListener('change', effectsControlChangeHandler);
});

/**
 * При неверном заполнении элемента - показываем данную функцию
 * @param  {Node} element - неправильно заполненное поле формы
 * @param  {string} message - сообщение пользователю, указывающее на неверно заполненное поле
 */
var setErrorState = function (element, message) {
  element.style.borderColor = 'red';
  element.style.borderWidth = '3px';
  element.setCustomValidity(message);
};
/**
 * Функиця, кот. будет отрабатывать, если поле формы заполнено верно
 * @param  {Node} element - верно заполенное поле
 */
var setOrdinaryState = function (element) {
  element.style.borderColor = 'yellow';
  element.setCustomValidity('');
};

var uploadHashtagsEl = document.querySelector('.text__hashtags');
uploadHashtagsEl.addEventListener('focus', function (evt) {
  if (evt.target === uploadHashtagsEl) {
    document.removeEventListener('keydown', uploadCancelKeydownHandler);
  }
});

uploadHashtagsEl.addEventListener('change', function (evt) {
  var hashtags = evt.currentTarget.value.toLowerCase().split(' ');
  var j;

  if (hashtags.length > Hashtag.MAX_СOUNT) {
    setErrorState(evt.target, 'Максимальное число ХэшТэгов - ' + Hashtag.MAX_COUNT);
    return;
  } else {
    setOrdinaryState(evt.target);
  }

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== Hashtag.STARTING_SYMBOL) {
      setErrorState(evt.target, 'ХэшТэг должне начинаться со знака #');
      return;
    } else {
      setOrdinaryState(evt.target);
    }

    if (hashtags[i].length > Hashtag.MAX_LENGTH) {
      setErrorState(evt.target, 'Максимальная длина хэштэга - ' + Hashtag.MAX_LENGTH + ' символов');
      return;
    } else {
      setOrdinaryState(evt.target);
    }

    for (j = 0; j < hashtags.length; j++) {
      if (hashtags[i] === hashtags[j] && i !== j) {
        setErrorState(evt.target, 'ХэшТэги не должны повторяться!');
        return;
      } else {
        setOrdinaryState(evt.target);
      }
    }

    for (j = 0; j < hashtags.length; j++) {
      if (hashtags[i][j] === Hashtag.STARTING_SYMBOL && j !== 0) {
        setErrorState(evt.target, 'Хэштэги должны разделяться пробелами');
        return;
      } else {
        setOrdinaryState(evt.target);
      }
    }
  }
});
