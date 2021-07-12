# Interscript-JS: Interoperable Script Conversion Systems for JavaScript

## Purpose

This repository contains code for the Interscript JavaScript runtime ("Interscript-JS").

This software allows performing script conversions by using the
https://github.com/interscript/maps[default set of Interscript maps]
hosted at GitHub.

Interscript is a project for interoperable script conversion systems
and provides executable runtimes for multiple platforms.
Full documentation available https://github.com/interscript/interscript/[here].


## Integration

This section provides instructions on how to utilize Interscript-JS
with your application.

Interscript-JS can be used as a JS NPM library and integrated with
other JS applications.

### Configuration for NPM

```shell
$ npm install interscript
```

== Usage

=== Usage in Node.js

```javascript
var Interscript = require('interscript');
Interscript.load_map('bgnpcgn-ukr-Cyrl-Latn-2019').then(function() {
  alert(Interscript.transliterate('bgnpcgn-ukr-Cyrl-Latn-2019', prompt()));
});
```


=== Usage in web browsers

Please consult `js/index.html`.


=== Usage in Webpack

This library should be mostly compatible with webpack. It may be necessary to
supply a path to the maps, as those are not bundled by default.

To do so, you need to do something like:

```javascript
Interscript.map_path = "/node_modules/interscript/src/maps/";
```


=== Getting a list of available maps

The following code retrieves the full list of maps available.

```javascript
Interscript.load_map_list().then(function() {
  var list = Interscript.map_list();
});
```


== Copyright & license

This is a Ribose project. Copyright Ribose.

License: BSD 2-clause
