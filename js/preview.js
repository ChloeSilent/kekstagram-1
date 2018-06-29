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

  var renderComment = function (commentText, avatarUrl) {
    var commentElement = makeCommentTemplate();
    var avatarElement = commentElement.querySelector('.social__picture');

    avatarElement.src = avatarUrl;
    commentElement.appendChild(document.createTextNode(commentText));

    return commentElement;
  };

  var createNewComment = function (photo) {
    var pictureCommentsList = bigPictureElement.querySelector('.social__comments');

    while (pictureCommentsList.firstChild) {
      pictureCommentsList.removeChild(pictureCommentsList.firstChild);
    }

    photo['comments'].forEach(function (comment) {
      var commentText = comment;
      var avatarUrl = 'img/avatar-' + window.helpers.getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg';
      pictureCommentsList.appendChild(renderComment(commentText, avatarUrl));
    });
  };

  var showBigPictureElement = function (photo) {
    var pictureImage = bigPictureElement.querySelector('.big-picture__img img');
    var pictureLikes = bigPictureElement.querySelector('.likes-count');
    var pictureCommentsCount = bigPictureElement.querySelector('.comments-count');
    var pictureFirstComment = bigPictureElement.querySelector('.social__caption');

    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureCommentsCount.textContent = photo.comments.length;
    pictureFirstComment.textContent = photo.comments[0];

    var social = bigPictureElement.querySelector('.social');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
    // social.querySelector('.social__comment-count').classList.add('visually-hidden');

    createNewComment(photo);

    document.querySelector('body').classList.add('modal-open');

    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  };

  var hideBigPictureElement = function () {
    window.helpers.toggleOverlay(bigPictureElement, onBigPictureEscPress);
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);

    document.querySelector('body').classList.remove('modal-open');
  };

  var onBigPictureCancelClick = function () {
    hideBigPictureElement();
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.helpers.KeyCode.ESC) {
      hideBigPictureElement();
    }
  };

  window.preview = {
    showBigPictureElement: showBigPictureElement
  };

})();
