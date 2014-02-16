var fs = require('fs');
var rework = require('rework');
var expect = require('chai').expect;
var conformance = require('..');

var processFixture;

function readFixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

beforeEach(function () {
  processFixture = function (name) {
    return rework(readFixture(name))
      .use(conformance);
  };
});

describe('linting', function () {
  describe('a CSS file that lacks the `@define` notation', function () {
    it('must be ignored', function () {
      var ignore = function () {
        processFixture('ignore');
      };
      expect(ignore).not.to.Throw();
    });
  });

  describe('a css file that uses the `@define` notation', function () {
    it('must contain selectors that begin with a class', function () {
      var result = function () {
        processFixture('component-with-globals');
      };
      expect(result).to.Throw();
    });

    it('must contain selectors that begin with a class matching the component name', function () {
        processFixture('component-valid');
      var valid = function () {
        processFixture('component-valid');
      };
      expect(valid).not.to.Throw();

      var invalid = function () {
        processFixture('component-invalid');
      };
      expect(invalid).to.Throw();

      var invalid2 = function () {
        processFixture('component-invalid-2');
      };
      expect(invalid2).to.Throw();
    });

    it('must only declare custom properties, containing the component name, in a `:root` rule', function () {
      var valid = function () {
        processFixture('component-with-valid-root');
      };
      expect(valid).not.to.Throw();

      var invalid = function () {
        processFixture('component-with-invalid-root');
      };
      expect(invalid).to.Throw();

      var invalid2 = function () {
        processFixture('component-with-invalid-root-2');
      };
      expect(invalid2).to.Throw();
    });

    it('must handle media queries', function () {
      var valid = function () {
        processFixture('component-with-media-queries');
      };
      expect(valid).not.to.Throw();
    });
  });
});
