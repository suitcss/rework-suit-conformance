'use strict';

/**
 * Module dependencies
 */

var validateCustomProperties = require('./lib/validate-properties');
var validateSelectors = require('./lib/validate-selectors');
var validateRules = require('./lib/validate-rules');

/**
 * Module exports
 */

module.exports = conformance;

/**
 * Constants
 */

var MARKER = '@define';

/**
 * @param {Object} ast
 * @param {Function} reworkInstance
 */

function conformance(ast, reworkInstance) {
  var initialComment = ast.rules[0].comment;
  var isComponent = initialComment ? initialComment.indexOf(MARKER) !== -1 : false;

  if (!isComponent) return;

  var componentName = initialComment.split(MARKER)[1].trim();
  var rules = ast.rules.filter(function (rule) {
      if (rule.type !== 'rule') return;
      return rule;
  });

  validateRules(rules);
  validateSelectors(rules, componentName);
  validateCustomProperties(rules, componentName);
}
