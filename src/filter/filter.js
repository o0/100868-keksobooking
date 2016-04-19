/**
 * @fileoverview Функция фильтрации списка
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


var FilterType = require('./filter-type');


/**
 * @param {Array.<Object>} hotels
 * @param {FilterType} filterType
 * @return {Array.<Object>}
 */
var filter = function(hotels, filterType) {
  var hotelsToFilter = hotels.slice(0);

  switch (filterType) {
    case FilterType.PRICE:
      hotelsToFilter.sort(function(a, b) {
        return a.price - b.price;
      });
      break;
  }

  return hotelsToFilter;
};


module.exports = filter;
