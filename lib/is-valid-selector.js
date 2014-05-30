'use strict';

/**
 * Module exports
 */

module.exports = isValidSelector;

/**
 * @param {String} selector
 * @param {String} componentName
 */

function isValidSelector(selector, componentName, strict) {
  var OPTIONAL_PART =  '(?:\\-[a-zA-Z0-9]+)?';
  var OPTIONAL_MODIFIER = '(?:\\-\\-[a-zA-Z0-9]+)?';
  var OPTIONAL_STATE = '(?:\\.is\\-[a-zA-Z0-9]+)?';
  var RE_CLASS = /\.[a-zA-Z0-9]*/g;
  var RE_VALID_CLASS = new RegExp('\\.' + componentName + '\\b' + OPTIONAL_PART + OPTIONAL_MODIFIER + OPTIONAL_STATE, 'g');
  var strippedSelector = selector.replace(RE_VALID_CLASS, '__VALID__');

  if (selector === ':root') {
    return true;
  }

  if (strict === true && strippedSelector.substr(0).search(RE_CLASS) !== -1) {
    return false;
  }

  if (selector.substr(0).search(RE_VALID_CLASS) === 0) {
    return true;
  }

  return false;
}
