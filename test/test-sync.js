test( 'sync', function( assert ) {
  'use strict';

  var flktyA = new Flickity( '#sync-a', {
    sync: '#sync-b, #sync-c'
  });

  var elemB = document.querySelector('#sync-b');
  var flktyB = new Flickity( elemB );
  var elemC = document.querySelector('#sync-c');
  var flktyC = new Flickity( elemC );

  // HACK do async because syncing is async
  var done = assert.async();

  setTimeout( function() {
    flktyA.next();
    equal( flktyB.selectedIndex, 1, 'A.next() syncs to B' );
    equal( flktyC.selectedIndex, 1, 'A.next() syncs to C' );
    flktyB.previous();
    equal( flktyA.selectedIndex, 0, 'B.previous() syncs to A' );
    equal( flktyC.selectedIndex, 0, 'B.previous() syncs to C' );
    flktyA.select( 3 );
    equal( flktyB.selectedIndex, 3, 'A.select() syncs to B' );
    equal( flktyC.selectedIndex, 3, 'A.select() syncs to C' );
    // usync()
    flktyA.unsync('#sync-b, #sync-c');
    flktyA.select( 1 );
    equal( flktyB.selectedIndex, 3, 'A.unsync() unsyncs A from B' );
    equal( flktyC.selectedIndex, 3, 'A.unsync() unsyncs A from C' );
    flktyB.select( 4 );
    equal( flktyA.selectedIndex, 1, 'A.unsync() unsyncs B from A' );
    equal( flktyC.selectedIndex, 1, 'A.unsync() unsyncs C from A' );
    // sync()
    flktyB.sync('#sync-a, #sync-c');
    flktyB.select( 0 );
    equal( flktyA.selectedIndex, 0, 'B.sync() syncs B to A' );
    equal( flktyC.selectedIndex, 0, 'B.sync() syncs B to C' );
    flktyA.select( 2 );
    equal( flktyB.selectedIndex, 2, 'B.sync() syncs A to B' );
    equal( flktyC.selectedIndex, 2, 'B.sync() syncs C to B' );
    // unsyncAll()
    flktyA.unsyncAll();
    flktyA.select( 1 );
    equal( flktyB.selectedIndex, 2, 'A.unsyncAll() unsyncs A from B' );
    equal( flktyC.selectedIndex, 2, 'A.unsyncAll() unsyncs A from C' );
    flktyB.select( 4 );
    equal( flktyA.selectedIndex, 1, 'A.unsyncAll() unsyncs B from A' );
    equal( flktyC.selectedIndex, 1, 'A.unsyncAll() unsyncs B from C' );

    done();
  }, 100 );

});
