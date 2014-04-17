# rework-suit-conformance

A [Rework](https://github.com/reworkcss/rework) plugin to check the conformance
of [SUIT](https://github.com/suitcss/suit) CSS components.

[![Build Status](https://secure.travis-ci.org/suitcss/rework-suit-conformance.png?branch=master)](http://travis-ci.org/suitcss/rework-suit-conformance)

## Installation

```
npm install rework-suit-conformance
```

## Conformance tests

* All selectors are classes beginning with the defined `ComponentName`.
* All custom-property names contain the defined `ComponentName`.
* `:root` selector can only contain custom-properties.
* `:root` cannot be combined with other selectors.

## Use

### Defining a component

The plugin will only run against files that explicitly define themselves as a
named component, using a `/** @define ComponentName */` comment on the first
line of the file.

```css
/** @define MyComponent */

:root {
  --MyComponent-property: value;
  --property-MyComponent: value;
}

.MyComponent {}

.MyComponent .other {}
```

### Testing  CSS files

Pass your individual CSS files through the plugin. It will throw errors for
conformance failures, which you can use to interrupt your development build
task.

```js
var rework = require('rework');
var conformance = require('rework-suit-conformance');

files.forEach(function (file) {
  var css = fs.readFileSync(file, 'utf-8');
  rework(css).use(conformance);
});
```

## Development

Install the dependencies.

```
npm install
```

Run the tests.

```
npm test
```

Watch and automatically re-run the tests.

```
npm run watch
```
