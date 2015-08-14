var Sequence = function ( attributes ) {
  attributes = attributes || {};

  this.loadSteps( attributes.levels || this.defaultLevels() );

  this.numSteps    = attributes.steps || this.events.length;
  this.stepsRange  = _.range( this.numSteps );

  this.reset();
};

_.extend( Sequence.prototype, {
  next: function () {
    this.currentStep = (this.currentStep + 1) % this.numSteps;

    return this.currentEvent();
  },

  reset: function () {
    this.currentStep = this.numSteps - 1;
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
  },

  loadSteps: function ( steps ) {
    this.events   = this.mapLevels( steps );
    this.numSteps = this.events.length;
  },

  currentEvent: function () {
    return this.events[ this.currentStep ];
  }
});
