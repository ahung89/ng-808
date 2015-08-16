class Sequence {
  constructor ( attributes = {} ) {
    this.defaultLength = 32;

    this.loadSteps( attributes.levels || this.defaultLevels() );

    this.numSteps    = attributes.steps || this.events.length;
    this.stepsRange  = _.range( this.numSteps );

    this.reset();
  }

  get numSteps () {
    return this._numSteps;
  }

  set numSteps ( n ) {
    this._numSteps = n;
    this.fullSequence = this.mapFullSequence();
  }

  next () {
    return this.advanceBy(1);
  }

  previous () {
    return this.advanceBy(-1);
  }

  advanceBy ( n = 1 ) {
    this.currentStep = this.modIndex((this.currentStep + n), this.numSteps);

    return this.currentEvent();
  }

  seekTo ( n ) {
    var diff = n - this.currentStep;

    return this.advanceBy(diff);
  }

  reset () {
    this.currentStep = this.numSteps - 1;
  }

  // Because writing out an array literal with 32
  // elements is boring (and error-prone).
  defaultLevels () {
    return _.map( _.range(this.defaultLength), () => 0 );
  }

  mapLevels ( levels ) {
    return _.map( _.range(this.defaultLength), function ( i ) {
      var level = levels[i] || 0;
      return new SequenceEvent({level: level});
    });
  }

  clear () {
    this.loadSteps( this.defaultLevels() );
  }

  loadSteps ( steps ) {
    this.events   = this.mapLevels( steps );
    this.numSteps = steps.length;
  }

  currentEvent () {
    return this.events[ this.currentStep ];
  }

  eventAt ( step ) {
    var adjustedStep = step % this.numSteps;

    var event = this.events[ adjustedStep ];

    if ( step > this.numSteps ) {
      return new DummySequenceEvent({originalEvent: event});
    }
    else {
      return event;
    }
  }

  mapFullSequence () {
    return _.map( _.range(this.defaultLength), ( i ) => this.eventAt(i) );
  }

  // Workaround for JS incorrect handling of negative
  // wrapping with the % operator. Hat tip to:
  // http://javascript.about.com/od/problemsolving/a/modulobug.htm
  modIndex ( index, max ) {
    return ((index % max) + max) % max;
  }

  dump () {
    return _.map( _.range(this.numSteps), ( i ) => this.eventAt(i).level );
  }
}
