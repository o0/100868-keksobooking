/**
 * @fileoverview Шаблон отеля и функция отрисовки отеля на основе
 * шаблона с определенным набором данных
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;


var templateElement = document.querySelector('#hotel-template');
var elementToClone;


if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.hotel');
} else {
  elementToClone = templateElement.querySelector('.hotel');
}


/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
var getHotelElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.hotel-name').textContent = data.name;

  var backgroundImage = new Image();
  var backgroundLoadTimeout;

  /** @param {ProgressEvent} evt */
  backgroundImage.onload = function(evt) {
    clearTimeout(backgroundLoadTimeout);
    backgroundImage.onerror = null;
    backgroundImage = null;
    element.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
  };

  backgroundImage.onerror = function() {
    clearTimeout(backgroundLoadTimeout);
    backgroundImage.onload = null;
    backgroundImage = null;
    element.classList.add('hotel-nophoto');
  };

  backgroundImage.src = data.preview;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImage.onerror = null;
    backgroundImage.onload = null;
    backgroundImage.src = '';
    backgroundImage = null;
    element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);

  container.appendChild(element);

  return element;
};


module.exports = getHotelElement;
