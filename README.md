# Flickity sync

Enables `sync` option for [Flickity](http://flickity.metafizzy.co/)

You can sync two Flickity galleries. Whenever one selects a cell, its companion will select its cell of the same index.

``` html
<div class="gallery gallery-a">
  ...
</div>
<div class="gallery gallery-b">
  ...
</div>
```

``` js
// options
sync: 'gallery-b'
// set as a selector string

sync: document.querySelector('gallery-b')
// set as an element
```

[See demo on CodePen](http://codepen.io/desandro/pen/OPZJmE).

### jQuery

``` js
$('.gallery-a').flickity({
  sync: 'gallery-b'
});
// only need to set sync on one of the Flickity galleries
$('.gallery-b').flickity();
```

### Vanilla JS

``` js
var flktyA = new Flickity( '.gallery-a', {
  sync: '.gallery-b'
});
var flktyB = new Flickity('.gallery-b');
```

### HTML

``` html
<div class="gallery gallery-a js-flickity"
  data-flickity-options='{ "sync": ".gallery-b" }'>
  ...
</div>
<div class="gallery gallery-b js-flickity">
  ...
</div>
```

## Install

`flickity-sync.js` is included with the Flickity `pkgd.js` files. If you are using those, you do not need to install.

Bower: `bower install flickity-sync --save`

npm: `npm install flickity-sync`

### RequireJS

``` js
requirejs( [ 'path/to/flickity-sync' ], function( Flickity ) {
  var flktyA = new Flickity( '.gallery-a', {
    sync: '.gallery-b'
  });
  var flktyB = new Flickity('.gallery-b')
});
```

### Browserify

``` js
var Flickity = require('flickity-sync');

var flktyA = new Flickity( '.gallery-a', {
  sync: '.gallery-b'
});
var flktyB = new Flickity('.gallery-b');
```

---

By [Metafizzy](http://metafizzy.co)
