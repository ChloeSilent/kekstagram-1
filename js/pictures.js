'use strict';

var NUMBER_OF_OBJECTS = 25; // нужное кол-во обьектов
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var AVATARS_MAX = 6;

var PhotosArray = []; // массив для описания фоток

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

var picturesList = document.querySelector('.pictures'); // место для отрисовки сгенерированных DOM-элементов
var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link'); // искомый шаблон и нужный элемент в нем
var bigPicture = document.querySelector('.big-picture');

/**
 * Функция генерации случайного числа
 * @param {integer} min - номер первого элемента из массива
 * @param {integer} max - номер последнего элемента из массива - не включая это значение
 * @return {integer} rand - номер случайного элемента из массива
 */
var getRandomNum = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

/**
 * Вспомогательная функция для сортировки массива в произвольном порядке
 * @return {integer} - псевдослучайное число из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1)
 */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/**
 * Генерируем комментарии случайным образом, для каждого комментария берем 1 или 2 строки из массива COMMENTS
 * @return {Array} - массив с одним или двумя комментариями
 */
var generateComment = function () {
  var commentsCopy = COMMENTS.slice();
  commentsCopy.sort(compareRandom);

  var commentsSmallCopy = commentsCopy.slice(0, getRandomNum(1, 2));

  return commentsSmallCopy;
};

/**
 * Создаем обьект через функцию конструктор
 * @param {integer} n - текущий номер обьекта
 */
var PhotoDescription = function (n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNum(MIN_LIKES, MAX_LIKES);
  this.comments = generateComment(COMMENTS);
  this.description = DESCRIPTION[getRandomNum(0, DESCRIPTION.length)];
};

/**
 * Создаем массив оденотипных обьектов
 * @param {Object} ObjectSample - обьект-прототип, на основе которого будут сгенерированы остальные обьекты
 * @param {integer} count - количество обьектов для генерации
 * @return {Array} PhotosArray - массив из n-ого кол-ва сгенерированных обьектов
 */
var createArrayOfPhoto = function (ObjectSample, count) {
  for (var i = 0; i < count; i++) {
    PhotosArray.push(new ObjectSample(i));
  }
  return PhotosArray;
};

/**
 * Cоздаем DOM-элементы, заполняем их данными
 * @param {Object} photo - обьект для изменения данных
 * @return {DOM} pictureElement - нужный нам шаблон с измененными данными
 */
var createPictureElements = function (photo) {
  var pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return pictureElement;
};

/**
 * Отрисовываем сгенерированные DOM-элементы на странице
 * @param {Array} arrayOfObjects - массив из нужного кол-ва обьектов
 * @param {DOM} parentNode - блок для вставки на страницу сгенерированных DOM-элементов
*/
var insertElements = function (arrayOfObjects, parentNode) {
  var fragment = document.createDocumentFragment();
  arrayOfObjects.forEach(function (element) {
    fragment.appendChild(createPictureElements(element));
  });

  parentNode.appendChild(fragment);
};

// работаем с фотками
/**
 * Разворачиваем полную версию фотографии с комментариями и описанием
 * @param {Object} photo - обьект, на основе которого будут изменяться данные
 */
var setupBigPicture = function (photo) {
  bigPicture.classList.remove('hidden'); // показываем большое фото
  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
};

// // Удаляем старые комментарии
// var removeOldComments = function () {
//   var pictureComments = bigPicture.querySelector('.social__comments');
//   var removedComments = bigPicture.querySelectorAll('.social__comment');
//   removedComments.forEach(function (oldcomment) {
//     pictureComments.removeChild(oldcomment);
//   });
// };

/**
 * Добавляем комментарии
 * @param {Object} objectFromArray - любой обьект из сгенерированного массива
 */
var addComments = function (objectFromArray) {
  objectFromArray.comments.forEach(function (comment) {
    var pictureComments = bigPicture.querySelector('.social__comments');

    var pictureComment = document.createElement('li');
    pictureComment.classList.add('social__comment');
    pictureComments.appendChild(pictureComment);

    var pictureCommentImg = document.createElement('img');
    pictureCommentImg.classList.add('social__picture');
    pictureCommentImg.src = 'img/avatar-' + getRandomNum(1, AVATARS_MAX) + '.svg';
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
 */
var renderBigPicture = function () {
  setupBigPicture(PhotosArray[0]);
  // removeOldComments();
  addComments(PhotosArray[0]);
  hideCommentsElements();
};

// вызываем главные функции
var readyPhotos = createArrayOfPhoto(PhotoDescription, NUMBER_OF_OBJECTS); // создаем массив из n кол-ва обьектов
insertElements(readyPhotos, picturesList); // добавляем данные DOM-элементы в нужное место на странице
renderBigPicture(); // Отрисовываем большую фотографию с комментариями и описанием
