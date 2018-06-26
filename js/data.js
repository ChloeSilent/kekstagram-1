'use strict';

(function () {
  var PHOTOS_COUNT = 25; // количество объектов для генерации

  var MIN_LIKES = 15; // минимальное кол-во лайков, кот. могут быть у фотки
  var MAX_LIKES = 200; // макс. кол-во лайков

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
   * Создаем объект через функцию конструктор
   * @constructor
   * @param {integer} n - текущий номер объекта
   */
  var Photo = function (n) {
    this.url = 'photos/' + (n + 1) + '.jpg';
    this.likes = window.helpers.getRandomNumber(MIN_LIKES, MAX_LIKES);
    this.comments = window.helpers.generateComment(COMMENTS);
    this.description = DESCRIPTION[window.helpers.getRandomNumber(1, DESCRIPTION.length)];
  };

  /**
   * Создаем массив однотипных объектов
   * @param {Object} ObjectSample - объект-прототип, на основе которого будут сгенерированы остальные объекты
   * @param {integer} count - количество объектов для генерации
   * @return {Array} - массив из n-ого кол-ва сгенерированных объектов
   */
  var createArrayOfPhotos = function (ObjectSample, count) {
    var photos = []; // массив для описания фоток
    for (var i = 0; i < count; i++) {
      photos.push(new ObjectSample(i));
    }
    return photos;
  };

  window.data = {
    createArrayOfPhotos: createArrayOfPhotos(Photo, PHOTOS_COUNT), // создаем массив из n кол-ва объектов (фоток)
    PHOTOS_COUNT: PHOTOS_COUNT
  };
})();
