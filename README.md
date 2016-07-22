# Flickity sync

Enables `sync` option for [Flickity](http://flickity.metafizzy.co/)

You can sync two Flickity galleries. Whenever one selects a cell, its companion will select its cell of the same index.

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
sync: 'carousel-b'
// set as a selector string

sync: document.querySelector('carousel-b')
// set as an element
```

[See demo on CodePen](http://codepen.io/desandro/pen/OPZJmE).

### jQuery

``` js
$('.carousel-a').flickity({
  sync: 'carousel-b'
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
<div class="carousel carousel-a js-flickity"
  data-flickity-options='{ "sync": ".carousel-b" }'>
  ...
</div>
<div class="carousel carousel-b js-flickity">
  ...
</div>
```

## Install

`flickity-sync.js` is _not_ included with flickity.pkgd.js, so you'll need to add this file in addition.

Bower: `bower install flickity-sync --save`

npm: `npm install flickity-sync`

### RequireJS

``` js
requirejs( [ 'path/to/flickity-sync' ], function( Flickity ) {
  var flktyA = new Flickity( '.carousel-a', {
    sync: '.carousel-b'
  });
  var flktyB = new Flickity('.carousel-b')
});
```

### Browserify

``` js
var Flickity = require('flickity-sync');

var flktyA = new Flickity( '.carousel-a', {
  sync: '.carousel-b'
});
var flktyB = new Flickity('.carousel-b');
```

---

By [Metafizzy](http://metafizzy.co)
