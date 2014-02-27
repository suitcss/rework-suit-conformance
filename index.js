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
 * @param {Object} ast Rework AST
 * @param {Function} reworkInstance
 */

function conformance(ast, reworkInstance) {
  var initialComment = ast.rules[0].comment;
  var isComponent = initialComment ? initialComment.indexOf(MARKER) !== -1 : false;

  if (!isComponent) return;

  var componentName = initialComment.split(MARKER)[1].trim();
  var rules = getSimpleRules(ast.rules);

  validateRules(rules);
  validateSelectors(rules, componentName);
  validateCustomProperties(rules, componentName);
}

/**
 * Return an array of simple CSS rulesets, excluding @media rules, etc.
 *
 * @param {Object} rules Rules from Rework AST
 * @return {Array}
 */

function getSimpleRules(rules) {
  var simpleRules = [];
  rules.forEach(function (rule) {
    if (rule.rules) {
      simpleRules = simpleRules.concat(getSimpleRules(rule.rules));
    }
    if (rule.type == 'rule') {
      simpleRules.push(rule);
    }
  });
  return simpleRules;
}
