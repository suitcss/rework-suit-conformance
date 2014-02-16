'use strict';

/**
 * Module dependencies
 */

var isValidRule = require('./is-valid-rule');

/**
 * Module exports
 */

module.exports = validateRules;

/**
 * @param {Array} rules
 */

function validateRules(rules) {
  rules.forEach(function (rule) {
    var column = rule.position.start.column;
    var line = rule.position.start.line;

    if (!isValidRule(rule)) {
      throw new Error(
        'Invalid selectors in rule near line ' + line + ':' + column + '. ' +
        'Cannot combine `:root` with other selectors in a rule.'
      );
    }
  });
}
