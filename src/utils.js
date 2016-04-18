/**
 * @fileoverview Вспомогательные методы
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


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
   * @param {number} listSize
   * @param {number} page
   * @param {number} pageSize
   * @return {boolean}
   */
  nextPageIsAvailable: function(listSize, page, pageSize) {
    return page < Math.ceil(listSize / pageSize);
  }
}
