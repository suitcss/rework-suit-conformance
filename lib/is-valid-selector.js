'use strict';

/**
 * Module exports
 */

module.exports = isValidSelector;

/**
 * @param {String} selector
 * @param {String} componentName
 */

function isValidSelector(selector, componentName) {
  if (selector === ':root') {
    return true;
  }

  if (selector.indexOf('.' + componentName) === 0 && selector.match(/(\w+)/)[0] === componentName) {
    return true;
  }

  return false;
}
