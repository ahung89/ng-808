var Clock = function ( attributes ) {
  this.tempo = attributes.tempo;
};

_.extend( Clock.prototype, {
  stepLength: function () {
    return ((60 / this.tempo) * 1000) / 4;
  }
});
