var Clock = function ( attributes ) {
  Object.defineProperties( this, {
    swingPercent: {
      get: function () {
        return this.swing * 100;
      },
      set: function ( value ) {
        this.swing = value / 100;
      }
    }
  });

  this.tempo = attributes.tempo;

  this.minTempo = 10;
  this.maxTempo = 240;
};

_.extend( Clock.prototype, {
  stepLength: function (stepNum) {
    var straightLength = ((60 / this.tempo) * 1000) / 4;

    if ( !this.swing ) {
      return straightLength;
    }
    else {
      var swingLength = straightLength * this.swing;

      if ( stepNum % 2 === 0 ) {
        return straightLength - swingLength;
      }
      else {
        return straightLength + swingLength;
      }
    }
  },

  validTempo: function () {
    return (typeof( this.tempo ) === "number") &&
      ( this.tempo >= this.minTempo )          &&
      ( this.tempo <= this.maxTempo );
  }
});
