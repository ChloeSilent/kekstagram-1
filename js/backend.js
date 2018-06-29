'use strict';

(function () {
  var TIMEOUT = 5000;

  var Url = {
    POST: 'https://js.dump.academy/kekstagram', // отправляем данные на этот адрес через метод POST
    GET: 'https://js.dump.academy/kekstagram/data' // получаем (загружаем) данные отсюда через метод GET
  };

  var makeXhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    var HttpStatusCode = {
      SUCCESS: 200
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatusCode.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var downloadData = function (onLoad, onError) {
    var request = makeXhrRequest(onLoad, onError);
    request.open('GET', Url.GET);
    request.send();
  };

  var sendData = function (formData, onLoad, onError) {
    var request = makeXhrRequest(onLoad, onError);
    request.open('POST', URL.POST);
    request.send(formData);
  };

  window.backend = {
    downloadData: downloadData,
    sendData: sendData
  };
})();
