'use strict';

var load = require('./load');
var filter = require('./filter/filter');
var FilterType = require('./filter/filter-type');


var filtersContainer = document.querySelector('.hotels-filters');
var hotelsContainer = document.querySelector('.hotels-list');
var templateElement = document.querySelector('#hotel-template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.hotel');
} else {
  elementToClone = templateElement.querySelector('.hotel');
}


/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;


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
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
var getHotelElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.hotel-name').textContent = data.name;

  var backgroundImage = new Image();
  var backgroundLoadTimeout;

  /** @param {ProgressEvent} evt */
  backgroundImage.onload = function(evt) {
    clearTimeout(backgroundLoadTimeout);
    element.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
  };

  backgroundImage.onerror = function() {
    element.classList.add('hotel-nophoto');
  };

  backgroundImage.src = data.preview;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImage.src = '';
    element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);

  container.appendChild(element);
  return element;
};


/**
 * @param {Array} hotels
 * @param {number} page
 * @param {number} pageSize
 * @return {boolean}
 */
var isNextPageAvailable = function(hotels, page, pageSize) {
  return page < Math.floor(hotels.length / pageSize);
};


/** @return {boolean} */
var isBottomReached = function() {
  var GAP = 100;
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - 100 <= 0;
};


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

  while(isBottomReached() &&
        isNextPageAvailable(hotels, pageNumber, PAGE_SIZE)) {
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
        [13, 32].indexOf(evt.keyCode) > -1) {
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
