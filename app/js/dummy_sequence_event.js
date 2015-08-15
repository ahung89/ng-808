var DummySequenceEvent = function ( attributes ) {
  this.originalEvent = attributes.originalEvent;

  Object.defineProperties( this, {
    level: {
      get: function () {
        return this.originalEvent.level;
      },
      set: function( level ) {
        this.originalEvent.level = level;
      }
    }
  });
};
