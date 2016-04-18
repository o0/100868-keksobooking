/**
 * @fileoverview Функция фильтрации списка
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


define([
  './filter-type'
], function(FilterType) {
  /**
   * @param {Array.<Object>} hotels
   * @param {FilterType} filter
   * @return {Array.<Object>}
   */
  return function(hotels, filter) {
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
});
