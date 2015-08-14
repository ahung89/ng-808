var Clock = function ( attributes ) {
  this.tempo = attributes.tempo;

  this.minTempo = 10;
  this.maxTempo = 240;
};

_.extend( Clock.prototype, {
  stepLength: function () {
    return ((60 / this.tempo) * 1000) / 4;
  },

  validTempo: function () {
    return (typeof( this.tempo ) === "number") &&
      ( this.tempo >= this.minTempo )          &&
      ( this.tempo <= this.maxTempo );
  }
});
