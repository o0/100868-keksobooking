/**
 * @fileoverview Список отелей: загрузка, включение фильтрации и постраничная
 * отрисовка
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */


'use strict';


var filter = require('./filter/filter');
var FilterType = require('./filter/filter-type');
var getHotelElement = require('./hotel');
var load = require('./load');
var utils = require('./utils');


var filtersContainer = document.querySelector('.hotels-filters');
var hotelsContainer = document.querySelector('.hotels-list');
var footer = document.querySelector('footer');


/** @constant {string} */
var HOTELS_LOAD_URL = 'data/hotels.json';


/** @type {Array.<Object>} */
var hotels = [];


/** @type {Array.<Object>} */
var filteredHotels = [];


/** @constant {number} */
var PAGE_SIZE = 9;


/** @constant {Filter} */
var DEFAULT_FILTER = FilterType.ALL;


/** @constant {string} */
var ACTIVE_FILTER_CLASSNAME = 'hotel-filter-active';


/** @type {number} */
var pageNumber = 0;


/**
 * @param {Array.<Object>} hotels
 * @param {number} page
 */
var renderHotels = function(hotels, page) {
  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  var container = document.createDocumentFragment();

  hotels.slice(from, to).forEach(function(hotel) {
    getHotelElement(hotel, container);
  });

  hotelsContainer.appendChild(container);
};


/** @param {boolean} reset */
var renderNextPages = function(reset) {
  if (reset) {
    pageNumber = 0;
    hotelsContainer.innerHTML = '';
  }

  while(utils.elementIsAtTheBottom(footer) &&
        utils.nextPageIsAvailable(hotels.length, pageNumber, PAGE_SIZE)) {
    renderHotels(filteredHotels, pageNumber);
    pageNumber++;
  }
};


/** @param {FilterType} filterType */
var setFilterEnabled = function(filterType) {
  filteredHotels = filter(hotels, filterType);
  renderNextPages(true);

  var activeFilter = filtersContainer.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filterType);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
};


/**  Включение обработчика кликов по фильтрам */
var setFiltrationEnabled = function() {
  filtersContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('hotel-filter')) {
      setFilterEnabled(evt.target.id);
    }
  });

  filtersContainer.addEventListener('keydown', function(evt) {
    if (evt.target.classList.contains('hotel-filter') &&
        utils.isActivationEvent(event)) {
      evt.preventDefault();
      setFilterEnabled(evt.target.id);
    }
  });
};


/** Включение обработчика прокрутки */
var setScrollEnabled = function() {
  var scrollTimeout;

  window.addEventListener('scroll', function(evt) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      renderNextPages();
    }, 100);
  });
};


load(HOTELS_LOAD_URL, function(loadedHotels) {
  hotels = loadedHotels;

  setFiltrationEnabled();
  setFilterEnabled(DEFAULT_FILTER);
  setScrollEnabled();
});
