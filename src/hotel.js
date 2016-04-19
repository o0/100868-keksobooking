/**
 * @fileoverview Отель
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


define([
  './gallery',
  './utils'
], function(showGallery, utils) {
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
  return function(data, container) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.hotel-name').textContent = data.name;

    var backgroundImage = new Image();
    var backgroundLoadTimeout;

    /** @param {ProgressEvent} evt */
    backgroundImage.onload = function(evt) {
      clearTimeout(backgroundLoadTimeout);
      element.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
    };

    backgroundImage.onerror = function() {
      element.classList.add('hotel-nophoto');
    };

    backgroundImage.src = data.preview;

    backgroundLoadTimeout = setTimeout(function() {
      backgroundImage.src = '';
      element.classList.add('hotel-nophoto');
    }, IMAGE_LOAD_TIMEOUT);

    container.appendChild(element);

    element.addEventListener('click', function() {
      showGallery(data.pictures);
    });

    element.addEventListener('keydown', function(evt) {
      if (utils.isActivationEvent(evt)) {
        if (evt.target.classList.contains('hotel')) {
          evt.preventDefault();
          showGallery(data.pictures);
        }

        if (evt.target.classList.contains('hotel-favourite')) {
          evt.preventDefault();
          //
        }
      }
    });

    return element;
  };
});
