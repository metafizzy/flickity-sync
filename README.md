# Flickity sync

Enables `sync` option for [Flickity](https://flickity.metafizzy.co/)

You can sync two Flickity carousels. Whenever one selects a cell, its companion will select its matching cell of the same index.

``` html
<div class="carousel carousel-a">
  ...
</div>
<div class="carousel carousel-b">
  ...
</div>
```

``` js
// options
sync: '.carousel-b'
// set as a selector string

sync: document.querySelector('.carousel-b')
// set as an element
```

[See demo on CodePen](https://codepen.io/desandro/pen/OPZJmE).

## Install

Add `flickity-sync.js` to your scripts.

### Download

+ [flickity-sync.js](https://unpkg.com/flickity-sync@2/flickity-sync.js)

### CDN

``` html
<script src="https://unpkg.com/flickity-sync@2/flickity-sync.js"></script>
```

### Package managers

npm: `npm install flickity-sync`

Bower: `bower install flickity-sync`

## Usage

### jQuery

``` js
$('.carousel-a').flickity({
  sync: '.carousel-b'
});
// only need to set sync on one of the Flickity galleries
$('.carousel-b').flickity();
```

### Vanilla JS

``` js
var flktyA = new Flickity( '.carousel-a', {
  sync: '.carousel-b'
});
var flktyB = new Flickity('.carousel-b');
```

### HTML

``` html
<div class="carousel carousel-a" data-flickity='{ "sync": ".carousel-b" }'>
  ...
</div>
<div class="carousel carousel-b" data-flickity>
  ...
</div>
```

### Webpack & Browserify

``` js
var Flickity = require('flickity-sync');

var flktyA = new Flickity( '.carousel-a', {
  sync: '.carousel-b'
});
var flktyB = new Flickity('.carousel-b');
```

### RequireJS

``` js
requirejs( [ 'path/to/flickity-sync' ], function( Flickity ) {
  var flktyA = new Flickity( '.carousel-a', {
    sync: '.carousel-b'
  });
  var flktyB = new Flickity('.carousel-b')
});
```

---

By [Metafizzy 🌈🐻](https://metafizzy.co)
