var Part = function ( attributes ) {
  this.name = attributes.name;
  this.sequence = new Sequence();

  this.advanceSequence();
};

_.extend( Part.prototype, {
  advanceSequence: function () {
    this.currentEvent = this.sequence.next();
  }
});
