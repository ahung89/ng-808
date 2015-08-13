var Sequence = function ( attributes ) {
  attributes = attributes || {};

  // Because writing out an array literal with 16
  // elements is boring (and error-prone).
  var defaultLevels = function () {
    return _.map( _.range(16), function () {
      return 0;
    });
  };

  var mapLevels = function ( levels ) {
    return _.map( levels, function ( level ) {
      return new SequenceEvent({level: level});
    });
  };

  this.numSteps    = attributes.steps || 16;
  this.events      = mapLevels(attributes.levels || defaultLevels());
  this.currentStep = 0;
};

_.extend( Sequence.prototype, {
  next: function () {
    var event = this.events[this.currentStep];

    this.currentStep = (this.currentStep + 1) % this.numSteps;

    return event;
  }
});
