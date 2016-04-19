/**
 * @fileoverview Компонента фотогалереи
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


var utils = require('./utils');


/** @constructor */
var Gallery = function() {
  var self = this;

  this.element = document.querySelector('.gallery');

  var closeElement = this.element.querySelector('.gallery-close');
  var thumbnailsContainer = this.element.querySelector('.gallery-thumbnails');
  var preview = this.element.querySelector('.gallery-picture');

  this.galleryPictures = [];
  this.activePicture = 0;


  /**
   * @param {KeyboardEvent} evt
   */
  this.onCloseClickHandler = function() {
    self.hideGallery();
  };


  /**
   * @param {KeyboardEvent} evt
   */
  this.onCloseKeydownHandler = function(evt) {
    if (utils.isActivationEvent(evt)) {
      evt.preventDefault();
      self.hideGallery();
    }
  };


  /**
   * @param {KeyboardEvent} evt
   */
  this.onDocumentKeydownHandler = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      self.hideGallery();
    }
  };


  /**
   * @param {number} picture
   */
  this.setActivePicture = function(picture) {
    var thumbnails = thumbnailsContainer.querySelectorAll('img');

    var currentlyActivePic = thumbnailsContainer.querySelector('.active');
    if (currentlyActivePic) {
      currentlyActivePic.classList.remove('active');
    }

    thumbnails[picture].classList.add('active');
    preview.src = thumbnails[picture].src;
  };


  /**
   * @param {Array.<pictues>} pictures
   */
  this.showGallery = function(pictures) {
    if (pictures !== this.galleryPictures) {
      thumbnailsContainer.innerHTML = '';

      this.galleryPictures = pictures;

      pictures.forEach(function(pic) {
        var pictureElement = new Image();
        pictureElement.classList.add('gallery-thumbnails-image');
        thumbnailsContainer.appendChild(pictureElement);
        pictureElement.src = pic;
      }, this);
    }

    utils.setElementHidden(this.element, false);

    document.addEventListener('keydown', this.onDocumentKeydownHandler);
    closeElement.addEventListener('click', this.onCloseClickHandler);
    closeElement.addEventListener('keydown', this.onCloseKeydownHandler);

    this.activePicture = 0;
    this.setActivePicture(this.activePicture);
  };


  this.hideGallery = function() {
    utils.setElementHidden(this.element, true);

    document.removeEventListener('keydown', this.onDocumentKeydownHandler);
    closeElement.removeEventListener('click', this.onCloseClickHandler);
    closeElement.removeEventListener('keydown', this.onCloseKeydownHandler);
  };
};


module.exports = new Gallery();
