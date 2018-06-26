'use strict';

(function () {
  var MAX_AVATARS = 6; // максимальное кол-во фоток-аватаров пользователей
  var MIN_AVATARS = 1; // мин. кол-во фоток аватаров пользователей

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');

  var makeCommentTemplate = function () {
    var commentElement = document.createElement('li');
    var avatarElement = document.createElement('img');

    commentElement.classList.add('social__comment');
    commentElement.classList.add('social__comment--text');
    avatarElement.classList.add('social__picture');

    avatarElement.width = '35';
    avatarElement.height = '35';
    avatarElement.alt = 'Аватар комментатора фотографии';

    commentElement.appendChild(avatarElement);

    return commentElement;
  };

  var renderComent = function (commentText, avatarUrl) {
    var commentElement = makeCommentTemplate();
    var avatarElement = commentElement.querySelector('.social__picture');

    avatarElement.src = avatarUrl;
    commentElement.appendChild(document.createTextNode(commentText));

    return commentElement;
  };

  var showBigPictureElement = function (photo) {
    var pictureImage = bigPictureElement.querySelector('.big-picture__img img');
    var pictureLikes = bigPictureElement.querySelector('.likes-count');
    var pictureComentsCount = bigPictureElement.querySelector('.comments-count');
    var pictureComentsList = bigPictureElement.querySelector('.social__comments');

    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComentsCount.textContent = photo.comments.length;

    while (pictureComentsList.firstChild) {
      pictureComentsList.removeChild(pictureComentsList.firstChild);
    }
    for (var i = 0; i < photo.comments.length; i++) {
      var commentText = photo.comments[i];
      var avatarUrl = 'img/avatar-' + window.helpers.getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg';
      pictureComentsList.appendChild(renderComent(commentText, avatarUrl));
    }

    var social = bigPictureElement.querySelector('.social');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
    social.querySelector('.social__comment-count').classList.add('visually-hidden');

    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  };

  var hideBigPictureElement = function () {
    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  };

  var onBigPictureCancelClick = function () {
    hideBigPictureElement();
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCodes.ESC) {
      hideBigPictureElement();
    }
  };

  window.preview = {
    showBigPictureElement: showBigPictureElement
  };

})();
