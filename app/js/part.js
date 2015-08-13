var Part = function ( attributes ) {
  this.name = attributes.name;
  this.sequence = new Sequence();
  this.currentEvent = this.sequence.next();
};
