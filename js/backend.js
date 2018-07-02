'use strict';

(function () {
  var TIMEOUT = 5000; // ms - таймаут в 5 секунд

  var Url = {
    POST: 'https://js.dump.academy/kekstagram', // отправляем данные на этот адрес через метод POST
    GET: 'https://js.dump.academy/kekstagram/data' // получаем (загружаем) данные отсюда через метод GET
  };

  /**
   * Формуруем XHR для запросов к серверу
   * @param  {cb} onLoad - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param  {cb} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @return {Object} - подготовленный объект XHR
   */
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
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  /**
   * Функция получения данных с сервера
   * @param  {cb} onLoad -  функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * При вызове функции onLoad в её единственный параметр передаётся набор полученных данных
   * @param  {cb} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   *  При вызове функции onError в её единственный параметр передаётся сообщение об ошибке
   */
  var downloadData = function (onLoad, onError) {
    var request = makeXhrRequest(onLoad, onError);
    request.open('GET', Url.GET);
    request.send();
  };

  /**
   * Функция для отправки данных на сервер
   * @param  {Object} formData - данные для отправки
   * @param  {cb} onLoad - функция-обработчик успешной загрузки
   * @param  {cb} onError - функция-обработчик ошибок
   */
  var sendData = function (formData, onLoad, onError) {
    var request = makeXhrRequest(onLoad, onError);
    request.open('POST', Url.POST);
    request.send(formData);
  };

  window.backend = {
    downloadData: downloadData,
    sendData: sendData
  };
})();
