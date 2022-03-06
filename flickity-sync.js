/*!
 * Flickity sync v2.0.0
 * enable sync for Flickity
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('flickity'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// -------------------------- sync prototype -------------------------- //

// Flickity.defaults.sync = false;

Flickity.create.sync = function() {
  this.syncers = {};
  let syncOption = this.options.sync;

  this.on( 'destroy', this.unsyncAll );

  if ( !syncOption ) return;
  // HACK do async, give time for other flickity to be initalized
  setTimeout( () => {
    this.sync( syncOption );
  } );
};

let proto = Flickity.prototype;

/**
 * sync
 * @param {[Element, String]} elem
 */
proto.sync = function( elem ) {
  elem = utils.getQueryElement( elem );
  let companion = Flickity.data( elem );
  if ( !companion ) return;
  // two hearts, that beat as one
  this._syncCompanion( companion );
  companion._syncCompanion( this );
};

/**
 * @param {Flickity} companion
 */
proto._syncCompanion = function( companion ) {
  let _this = this;
  function syncListener() {
    let index = _this.selectedIndex;
    // do not select if already selected, prevent infinite loop
    if ( companion.selectedIndex !== index ) {
      companion.select( index );
    }
  }
  this.on( 'select', syncListener );
  // keep track of all synced flickities
  // hold on to listener to unsync
  this.syncers[ companion.guid ] = {
    flickity: companion,
    listener: syncListener,
  };
};

/**
 * unsync
 * @param {[Element, String]} elem
 */
proto.unsync = function( elem ) {
  elem = utils.getQueryElement( elem );
  let companion = Flickity.data( elem );
  this._unsync( companion );
};

/**
 * @param {Flickity} companion
 */
proto._unsync = function( companion ) {
  if ( !companion ) return;
  // I love you but I've chosen darkness
  this._unsyncCompanion( companion );
  companion._unsyncCompanion( this );
};

/**
 * @param {Flickity} companion
 */
proto._unsyncCompanion = function( companion ) {
  let id = companion.guid;
  let syncer = this.syncers[ id ];
  this.off( 'select', syncer.listener );
  delete this.syncers[ id ];
};

proto.unsyncAll = function() {
  for ( let id in this.syncers ) {
    let syncer = this.syncers[ id ];
    this._unsync( syncer.flickity );
  }
};

// -----  ----- //

return Flickity;

} ) );
