/**
 * @fileoverview Универсальный метод для загрузки данных
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


/**
 * @param {string} url
 * @param {function(Object)} callback
 */
var load = function(url, callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.open('GET', url);
  xhr.send();
};


module.exports = load;
