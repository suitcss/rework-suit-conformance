'use strict';

/**
 * Module exports
 */

module.exports = isValidRule;

/**
 * @param {Object} rule
 */

function isValidRule(rule) {
  var selectors = rule.selectors;

  if (selectors.length > 1 && selectors.contain(':root')) {
    return false;
  }

  return true;
}
