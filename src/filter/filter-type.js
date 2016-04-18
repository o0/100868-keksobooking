/**
 * @fileoverview Список доступных видов фильтрации
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


/** @enum {number} */
define(function() {
  return {
    'ALL': 'all',
    'PRICE': 'expensive-first',
    'STARS': 'stars',
    'RATING': 'min-rating',
    'DISTANCE': 'distance',
    'FAVORITE': 'favorites'
  };
});
