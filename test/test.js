var fs = require('fs');
var rework = require('rework');
var expect = require('chai').expect;
var conformance = require('..');

function processFixture(name) {
  var css = fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
  return rework(css).use(conformance);
}

function assertSuccess(fixture) {
  var result = function () {
    processFixture(fixture);
  };
  expect(result).not.to.Throw();
}

function assertFailure(fixture) {
  var result = function () {
    processFixture(fixture);
  };
  expect(result).to.Throw();
}

describe('linting', function () {
  describe('a CSS file that lacks the `@define` notation', function () {
    it('must be ignored', function () {
      assertSuccess('all-ignore');
    });
  });

  describe('a css file that uses the `@define` notation', function () {
    it('must contain selectors that begin with a class matching the component name', function () {
      assertSuccess('valid-rules');
      assertFailure('all-false-match');
      assertFailure('all-invalid-selector-tag');
      assertFailure('all-invalid-selector-component');
    });

    it('must only declare custom properties, containing the component name, in a `:root` rule', function () {
      assertSuccess('all-valid-root-vars');
      assertFailure('all-invalid-root-vars');
      assertFailure('all-invalid-root-property');
      assertFailure('all-invalid-root-selector');
    });

    it('must apply to selectors in media queries', function () {
      assertSuccess('all-valid-selector-in-media-query');
      assertFailure('all-invalid-selector-in-media-query');
    });
  });

  describe('a css file that uses the strict `@define` notation', function () {
    it('must contain only contain valid component classes in selectors', function () {
      assertSuccess('strict-valid-rules');
      assertFailure('strict-invalid-selector');
    });
  });
});
