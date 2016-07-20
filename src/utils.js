/**
 * @fileoverview Вспомогательные методы
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


define(function() {
  /** @constant {string} */
  var HIDDEN_CLASSNAME = 'hidden';


  /** @enum {number} */
  var KeyCode = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32
  };


  /** @constant {number} */
  var GAP = 100;


  return {
    /**
     * @param {Node} element
     * @return {boolean}
     */
    elementIsAtTheBottom: function(element) {
      var elementPosition = element.getBoundingClientRect();
      return elementPosition.top - window.innerHeight - GAP <= 0;
    },


    /**
     * @param {Event} evt
     * @return {boolean}
     */
    isActivationEvent: function(evt) {
      return [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.keyCode) > -1;
    },


    /**
     * @param {Event} evt
     * @return {boolean}
     */
    isDeactivationEvent: function(evt) {
      return evt.keyCode === KeyCode.ESC;
    },


    /**
     * @param {number} listSize
     * @param {number} page
     * @param {number} pageSize
     * @return {boolean}
     */
    nextPageIsAvailable: function(listSize, page, pageSize) {
      return page < Math.ceil(listSize / pageSize);
    },


    /**
     * @param {Element} element
     * @param {boolean} hidden
     */
    setElementHidden: function(element, hidden) {
      element.classList.toggle(HIDDEN_CLASSNAME, hidden);
    },


    /**
     * @param {Function} fn
     * @param {number} timeout
     * @return {Function} [description]
     */
    throttle: function(fn, timeout) {
      return function() {
        clearTimeout(fn._timeoutID);
        fn._timeoutID = setTimeout(fn, timeout);
      };
    }
  };
});
