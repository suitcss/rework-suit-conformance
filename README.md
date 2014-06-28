# rework-suit-conformance

[![Build Status](https://secure.travis-ci.org/suitcss/rework-suit-conformance.png?branch=master)](http://travis-ci.org/suitcss/rework-suit-conformance)

A [Rework](https://github.com/reworkcss/rework) plugin to check the conformance
of a component's CSS to the [SUIT CSS](https://github.com/suitcss/suit) methodology.

## Installation

```
npm install rework-suit-conformance
```

## Conformance tests

**Default mode**:

* Only allow selectors that *begin* with a class matching the defined `ComponentName`.
* Only allow custom-property names that *begin* with the defined `ComponentName`.
* The `:root` selector can only contain custom-properties.
* The `:root` cannot be combined with other selectors.

**Strict mode**:

* All the tests in "default mode".
* Disallow selectors that contain any classes that do not match the SUIT CSS conventions.
* Disallow selectors that contain classes of other components.

## Use

### Defining a component

The plugin will only run against files that explicitly define themselves as a
named component, using a `/** @define ComponentName */` or `/** @define
ComponentName; use strict */` comment on the first line of the file.

```css
/** @define MyComponent */

:root {
  --MyComponent-property: value;
}

.MyComponent {}

.MyComponent .other {}
```

Strict mode:

```css
/** @define MyComponent; use strict */

:root {
  --MyComponent-property: value;
}

.MyComponent {}

.MyComponent-other {}
```

### Testing CSS files

Pass your individual CSS files through the plugin. It will throw errors for
conformance failures, which you can log when caught by your build tools.

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
