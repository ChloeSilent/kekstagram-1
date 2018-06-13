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

var compareRandom = function () {
  return Math.random() - 0.5;
};

var generateComment = function () {
  var commentsCopy = COMMENTS.slice();
  commentsCopy.sort(compareRandom);

  var commentsSmallCopy = commentsCopy.slice(0, getRandomNum(1, 2));

  return commentsSmallCopy;
};

var PhotoDescription = function (n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNum(MIN_LIKES, MAX_LIKES);
  this.comments = generateComment(COMMENTS);
  this.description = DESCRIPTION[getRandomNum(0, DESCRIPTION.length)];
};

var createArrayOfPhoto = function (ObjectSample, count) {
  for (var i = 0; i < count; i++) {
    PhotosArray.push(new ObjectSample(i));
  }
  return PhotosArray;
};

var createPictureElements = function (photo) {
  var pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return pictureElement;
};

var insertElements = function (data, parentNode) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (element) {
    fragment.appendChild(createPictureElements(element));
  });

  parentNode.appendChild(fragment);
};

// работаем с фотками

// разворачиваем полную версию фотографии с комментариями и описанием
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

// добавляем комментарии
var addComments = function (data) {
  data.comments.forEach(function (comment) {
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

var hideCommentsElements = function () {
  var social = bigPicture.querySelector('.social');
  social.querySelector('.social__loadmore').classList.add('visually-hidden');
  social.querySelector('.social__comment-count').classList.add('visually-hidden');
};

var renderBigPicture = function (data) {
  setupBigPicture(PhotosArray[0]);
  // removeOldComments();
  addComments(PhotosArray[0]);
  hideCommentsElements();
};

var readyPhotos = createArrayOfPhoto(PhotoDescription, NUMBER_OF_OBJECTS);
insertElements(readyPhotos, picturesList);
renderBigPicture(readyPhotos);
