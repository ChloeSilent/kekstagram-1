'use strict';

(function () {
  var MAX_AVATARS = 6; // максимальное кол-во фоток-аватаров пользователей
  var MIN_AVATARS = 1; // мин. кол-во фоток аватаров пользователей

  var MIN_COMMENTS = 5; // отображаем не более 5 комментариев

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var loadMoreCommentsBtnElement = bigPictureElement.querySelector('.social__loadmore');
  var shownCommentsCountElement = bigPictureElement.querySelector('.comments-shown-count');
  var commentsListElement = bigPictureElement.querySelector('.social__comments');

  var commentsData = null;
  var shownComments = [];

  /**
   * Чистим разметку от старых комментариев
   */
  var removeOldComments = function () {

    var removedCommentsElement = bigPictureElement.querySelectorAll('.social__comment');

    removedCommentsElement.forEach(function (oldComment) {
      commentsListElement.removeChild(oldComment);
    });
  };

  /**
   * Создаем комментарии, используя шаблон комментариев из разметки; вставляем их во фрагмент по 5
   * @param  {Array} comments - массив комментариев к фотке
   * @param  {integer} showCommentsNumber - количество комментариев в массиве
   * @return {Node} - фрагмент с комментариями
   */
  var createComments = function (comments, showCommentsNumber) {

    var fragmentComments = document.createDocumentFragment();

    var numberComments = comments.length <= showCommentsNumber ? comments.length : showCommentsNumber;
    for (var i = 0; i < numberComments; i++) {
      var commentExample = document.querySelector('#comment').content.cloneNode(true).querySelector('li');
      commentExample.classList.add('social__comment--text');
      commentExample.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + window.helpers.getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg');
      commentExample.querySelector('.social__text').textContent = comments[i];
      fragmentComments.appendChild(commentExample);
      shownComments.push(commentExample);
    }
    return fragmentComments;
  };

  // Если показаны все комментарии - прячем кнопку, если нет - показываем
  var showHideCommentsButton = function () {
    if (commentsData.length - shownComments.length) {
      loadMoreCommentsBtnElement.classList.remove('hidden');
    } else {
      loadMoreCommentsBtnElement.classList.add('hidden');
    }
  };

  // Обновляем счетчик комметариев
  var updateCommentsCount = function () {
    shownCommentsCountElement.textContent = shownComments.length;
  };

  // Добавляем 5 новых комментариев
  var onCommentsButtonClick = function () {
    var notShownComments = commentsData.slice(shownComments.length);
    if (notShownComments.length > 0) {
      commentsListElement.appendChild(createComments(notShownComments, MIN_COMMENTS));
    }
    updateCommentsCount();
    showHideCommentsButton();
  };

  // Вешаем обработчик на кнопку "загрузить еще комментарии"
  loadMoreCommentsBtnElement.addEventListener('click', onCommentsButtonClick);

  /**
   * Отрисовываем полную версию фотографии с комментариями
   * @param  {Object} photo - объект, на основе которого будут изменяться данные
   */
  var showBigPictureElement = function (photo) {
    var pictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
    var pictureLikesElement = bigPictureElement.querySelector('.likes-count');
    var pictureCommentsCountElement = bigPictureElement.querySelector('.comments-count');

    commentsData = photo.comments;
    pictureImageElement.src = photo.url;
    pictureLikesElement.textContent = photo.likes;
    pictureCommentsCountElement.textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description || '';

    removeOldComments();
    commentsListElement.appendChild(createComments(commentsData, MIN_COMMENTS));
    updateCommentsCount();
    showHideCommentsButton();

    document.querySelector('body').classList.add('modal-open');

    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancelElement.addEventListener('click', onBigPictureCancelClick);
  };

  /**
   * Прячем полную версию фотографии
   */
  var hideBigPictureElement = function () {
    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancelElement.removeEventListener('click', onBigPictureCancelClick);

    document.querySelector('body').classList.remove('modal-open');

    commentsData = null;
    shownComments = [];
  };

  /**
   * Обработчик события, закрывающий полную версию фотографии по клике на close-button
   */
  var onBigPictureCancelClick = function () {
    hideBigPictureElement();
  };

  /**
   * Обработчик события? закрывающий полную версию фотографии при нажатии ESC
   * @param  {Object} evt - объект события
   */
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCode.ESC) {
      hideBigPictureElement();
    }
  };

  window.showBigPictureElement = showBigPictureElement;

})();
