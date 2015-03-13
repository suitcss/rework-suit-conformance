'use strict';

/**
 * Module dependencies
 */

var isValidRule = require('./is-valid-rule');

/**
 * Module exports
 */

module.exports = validateCustomProperties;

/**
 * @param {Array} rules
 * @param {String} componentName
 */

function validateCustomProperties(rules, componentName) {
  rules.forEach(function (rule) {
    if (!isValidRule(rule) || rule.selectors[0] !== ':root') return;

    rule.declarations.filter(function(declaration) {
      // skip comments
      return declaration.type === 'declaration';
    }).forEach(function (declaration) {
      var column = declaration.position.start.column;
      var line = declaration.position.start.line;
      var property = declaration.property;

      if (property.indexOf('--') !== 0) {
        throw new Error(
          'Invalid property name "' + property + '" near line ' + line + ':' + column + '. ' +
          'A component\'s `:root` rule must only contain custom properties.'
        );
      }
      if (property.indexOf(componentName + '-') !== 2) {
        throw new Error(
          'Invalid custom property name "' + property + '" near line ' + line + ':' + column + '. ' +
          'Custom properties must contain the component name.'
        );
      }
    });
  });
}
