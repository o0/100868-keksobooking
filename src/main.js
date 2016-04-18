'use strict';

var load = require('./load');

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


/** @enum {number} */
var Filter = {
  'ALL': 'all',
  'PRICE': 'expensive-first',
  'STARS': 'stars',
  'RATING': 'min-rating',
  'DISTANCE': 'distance',
  'FAVORITE': 'favorites'
};


/** @constant {Filter} */
var DEFAULT_FILTER = Filter.ALL;


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


/**
 * @param {Array.<Object>} hotels
 * @param {Filter} filter
 * @return {Array.<Object>}
 */
var getFilteredHotels = function(hotels, filter) {
  var hotelsToFilter = hotels.slice(0);

  switch (filter) {
    case Filter.PRICE:
      hotelsToFilter.sort(function(a, b) {
        return a.price - b.price;
      });
      break;
  }

  return hotelsToFilter;
};


/** @param {Filter} filter */
var setFilterEnabled = function(filter) {
  filteredHotels = getFilteredHotels(hotels, filter);
  renderNextPages(true);

  var activeFilter = filtersContainer.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filter);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
};


var setFiltersEnabled = function() {
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

  setFiltersEnabled();
  setFilterEnabled(DEFAULT_FILTER);
  setScrollEnabled();
});
