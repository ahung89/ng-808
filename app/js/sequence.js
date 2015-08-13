var Sequence = function ( attributes ) {
  attributes = attributes || {};

  this.numSteps    = attributes.steps || 16;
  this.events      = this.mapLevels(attributes.levels || this.defaultLevels());
  this.currentStep = this.numSteps - 1;
  this.stepsRange  = _.range( this.numSteps );
};

_.extend( Sequence.prototype, {
  next: function () {
    this.currentStep = (this.currentStep + 1) % this.numSteps;

    var event = this.events[this.currentStep];

    return event;
  },

  // Because writing out an array literal with 16
  // elements is boring (and error-prone).
  defaultLevels: function () {
    return _.map( _.range(16), function () {
      return 0;
    });
  },

  mapLevels: function ( levels ) {
    return _.map( levels, function ( level ) {
      return new SequenceEvent({level: level});
    });
  }
});
