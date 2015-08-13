var Part = function ( attributes ) {
  this.name = attributes.name;
  this.sequence = new Sequence();

  this.reset();
};

_.extend( Part.prototype, {
  advanceSequence: function () {
    this.currentEvent = this.sequence.next();
  },

  reset: function () {
    this.sequence.reset();
    this.advanceSequence();
  }
});
