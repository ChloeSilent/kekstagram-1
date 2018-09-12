'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms - отрисовка изображений производится не чаще, чем один раз в полсекунды
  var lastTimeout;

  /**
   * Функция устанения дребезга (откладываем перерисовки DOM-элементов на время, равное DEBOUNCE_INTERVAL)
   * @param  {cb} cb - функция-коллбэк
   */
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
