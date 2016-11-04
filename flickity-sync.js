/*!
 * Flickity sync v2.0.1
 * enable sync for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {

'use strict';

function normalizeElements(elems) {
  if (typeof elems === "string") {
    elems = elems.split(',').map(function (selector) {
    	return selector.trim();
    });
  } else if (!Array.isArray(elems)) {
    elems = [elems];
  }
  return elems;
}

// -------------------------- sync prototype -------------------------- //

// Flickity.defaults.sync = false;

Flickity.createMethods.push('_createSync');

Flickity.prototype._createSync = function() {
  this.syncers = {};
  var syncOption = this.options.sync;

  this.on( 'destroy', this.unsyncAll );

  if ( !syncOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initSyncCompanion() {
    _this.sync( syncOption );
  });
};

/**
 * sync
 * @param {Element} or {String} elem
 */
Flickity.prototype.sync = function( elems ) {
	var self = this;
  elems = normalizeElements(elems);
  elems.forEach(function (elem) {
  	elem = utils.getQueryElement( elem );
    var companion = Flickity.data( elem );
    if ( !companion ) {
      return;
    }
    // many hearts, that beat as one
    self._syncCompanion( companion );
    companion._syncCompanion( self );
  });
};

/**
 * @param {Flickity} companion
 */
Flickity.prototype._syncCompanion = function( companion ) {
  var _this = this;
  function syncListener() {
    var index = _this.selectedIndex;
    // do not select if already selected, prevent infinite loop
    if ( companion.selectedIndex != index ) {
      companion.select( index );
    }
  }
  this.on( 'select', syncListener );
  // keep track of all synced flickities
  // hold on to listener to unsync
  console.log("GUID", companion.guid);
  this.syncers[ companion.guid ] = {
    flickity: companion,
    listener: syncListener
  };
};

/**
 * unsync
 * @param {Element} or {String} elem
 */
Flickity.prototype.unsync = function( elems ) {
  var self = this;
  elems = normalizeElements(elems);
  elems.forEach(function (elem) {
    elem = utils.getQueryElement( elem );
    var companion = Flickity.data( elem );
    self._unsync( companion );
  });
};

/**
 * @param {Flickity} companion
 */
Flickity.prototype._unsync = function( companion ) {
  if ( !companion ) {
    return;
  }
  // I love you but I've chosen darkness
  this._unsyncCompanion( companion );
  companion._unsyncCompanion( this );
};

/**
 * @param {Flickity} companion
 */
Flickity.prototype._unsyncCompanion = function( companion ) {
  var id = companion.guid;
  var syncer = this.syncers[ id ];
  this.off( 'select', syncer.listener );
  delete this.syncers[ id ];
};

Flickity.prototype.unsyncAll = function() {
  for ( var id in this.syncers ) {
    var syncer = this.syncers[ id ];
    this._unsync( syncer.flickity );
  }
};

// -----  ----- //

return Flickity;

}));
