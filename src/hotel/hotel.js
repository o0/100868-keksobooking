/**
 * @fileoverview Объект, описывающий поведение отеля на странице:
 * — получение данных
 * — отрисовку на страницу
 * — добавление обработчиков событий на разные действия
 * — удаление элемента со страницы и очистку памяти
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


var getHotelElement = require('./get-hotel-element');
var gallery = require('../gallery');
var utils = require('../utils');


/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
var Hotel = function(data, container) {
  this.data = data;
  this.element = getHotelElement(this.data, container);

  this.onHotelClick = function() {
    gallery.showGallery(data.pictures);
  };

  this.onHotelKeydown = function(evt) {
    if (utils.isActivationEvent(evt)) {
      if (evt.target.classList.contains('hotel')) {
        evt.preventDefault();
        gallery.showGallery(data.pictures);
      }
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onHotelClick);
    this.element.removeEventListener('keydown', this.onHotelKeydown);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onHotelClick);
  this.element.addEventListener('keydown', this.onHotelKeydown);
  container.appendChild(this.element);
};


module.exports = Hotel;
