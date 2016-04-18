/**
 * @fileoverview Вспомогательные методы
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


/** @enum {number} */
var KeyCode = {
  ENTER: 13,
  SPACE: 32
};


module.exports = {
  /**
   * @param {Node} element
   * @return {boolean}
   */
  elementIsAtTheBottom: function(element) {
    var GAP = 100;
    var elementPosition = element.getBoundingClientRect();
    return elementPosition.top - window.innerHeight - 100 <= 0;
  },


  /**
   * @param {Event} evt
   * @return {boolean}
   */
  isActivationEvent: function(evt) {
    return evt instanceof KeyboardEvent &&
           [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.keyCode) > -1;
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
   * @param {Function} fn
   * @param {number} timeout
   * @return {Function} [description]
   */
  throttle: function(fn, timeout) {
    return function() {
      clearTimeout(fn._timeoutID);
      fn._timeoutID = setTimeout(fn, timeout);
    }
  }
}
