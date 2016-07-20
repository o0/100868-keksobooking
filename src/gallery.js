/**
 * @fileoverview Компонента фотогалереи
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


define(['./utils'], function(utils) {
  var galleryContainer = document.querySelector('.gallery');
  var closeElement = galleryContainer.querySelector('.gallery-close');
  var thumbnailsContainer = galleryContainer.querySelector('.gallery-thumbnails');
  var preview = galleryContainer.querySelector('.gallery-picture');


  /** @type {Array.<string>} */
  var galleryPictures = [];


  /** @type {number} */
  var activePicture = 0;


  /**
   * @param {KeyboardEvent} evt
   */
  var onCloseClickHandler = function() {
    hideGallery();
  };


  /**
   * @param {KeyboardEvent} evt
   */
  var onCloseKeydownHandler = function(evt) {
    if (utils.isActivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  };


  /**
   * @param {KeyboardEvent} evt
   */
  var onDocumentKeydownHandler = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  };


  /**
   * @param {number} picture
   */
  var setActivePicture = function(picture) {
    var thumbnails = thumbnailsContainer.querySelectorAll('img');

    var currentlyActivePic = thumbnailsContainer.querySelector('.active');
    if (currentlyActivePic) {
      currentlyActivePic.classList.remove('active');
    }

    thumbnails[picture].classList.add('active');
    preview.src = thumbnails[picture].src;
  };


  var hideGallery = function() {
    utils.setElementHidden(galleryContainer, true);

    document.removeEventListener('keydown', onDocumentKeydownHandler);
    closeElement.removeEventListener('click', onCloseClickHandler);
    closeElement.removeEventListener('keydown', onCloseKeydownHandler);
  };


  /**
   * @param {Array.<pictues>} pictures
   */
  return function(pictures) {
    if (pictures !== galleryPictures) {
      thumbnailsContainer.innerHTML = '';

      galleryPictures = pictures;

      pictures.forEach(function(pic) {
        var pictureElement = new Image();
        pictureElement.classList.add('gallery-thumbnails-image');
        thumbnailsContainer.appendChild(pictureElement);
        pictureElement.src = pic;
      });
    }

    utils.setElementHidden(galleryContainer, false);

    document.addEventListener('keydown', onDocumentKeydownHandler);
    closeElement.addEventListener('click', onCloseClickHandler);
    closeElement.addEventListener('keydown', onCloseKeydownHandler);

    activePicture = 0;
    setActivePicture(activePicture);
  };
});
