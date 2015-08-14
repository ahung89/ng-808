var DummySequenceEvent = function ( attributes ) {
  this.originalEvent = attributes.originalEvent;

  Object.defineProperty( this, "level", {
    get: function () {
      return this.originalEvent.level;
    },
    set: function( level ) {
      this.originalEvent.level = level;
    }
  });
};
