/**
 * @fileoverview Функция фильтрации списка
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


var FilterType = require('./filter-type.js');


/**
 * @param {Array.<Object>} hotels
 * @param {FilterType} filter
 * @return {Array.<Object>}
 */
var filter = function(hotels, filter) {
  var hotelsToFilter = hotels.slice(0);

  switch (filter) {
    case FilterType.PRICE:
      hotelsToFilter.sort(function(a, b) {
        return a.price - b.price;
      });
      break;
  }

  return hotelsToFilter;
};


module.exports = filter;
