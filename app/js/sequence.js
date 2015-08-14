var Sequence = function ( attributes ) {
  attributes = attributes || {};

  this.defaultLength = 32;

  Object.defineProperty( this, "numSteps", {
    get: function () {
      return this._numSteps;
    },
    set: function( n ) {
      this._numSteps = n;
      this.fullSequence = this.mapFullSequence();
    }
  });

  this.loadSteps( attributes.levels || this.defaultLevels() );

  this.numSteps    = attributes.steps || this.events.length;
  this.stepsRange  = _.range( this.numSteps );

  this.reset();
};

_.extend( Sequence.prototype, {
  next: function () {
    return this.advanceBy(1);
  },

  previous: function () {
    return this.advanceBy(-1);
  },

  advanceBy: function ( n ) {
    n = n || 1;

    this.currentStep = this.modIndex((this.currentStep + n), this.numSteps);

    return this.currentEvent();
  },

  seekTo: function ( n ) {
    var diff = n - this.currentStep;

    return this.advanceBy(diff);
  },

  reset: function () {
    this.currentStep = this.numSteps - 1;
  },

  // Because writing out an array literal with 32
  // elements is boring (and error-prone).
  defaultLevels: function () {
    return _.map( _.range(this.defaultLength), function () {
      return 0;
    });
  },

  mapLevels: function ( levels ) {
    return _.map( _.range(this.defaultLength), function ( i ) {
      var level = levels[i] || 0;
      return new SequenceEvent({level: level});
    });
  },

  clear: function () {
    this.loadSteps( this.defaultLevels() );
  },

  loadSteps: function ( steps ) {
    this.events   = this.mapLevels( steps );
    this.numSteps = steps.length;
  },

  currentEvent: function () {
    return this.events[ this.currentStep ];
  },

  eventAt: function ( step ) {
    var adjustedStep = step % this.numSteps;

    var event = this.events[ adjustedStep ];

    if ( step > this.numSteps ) {
      return new DummySequenceEvent({originalEvent: event});
    }
    else {
      return event;
    }
  },

  mapFullSequence: function () {
    return _.map( _.range(this.defaultLength), function ( i ) {
      return this.eventAt(i);
    }, this);
  },

  // Workaround for JS incorrect handling of negative
  // wrapping with the % operator. Hat tip to:
  // http://javascript.about.com/od/problemsolving/a/modulobug.htm
  modIndex: function ( index, max ) {
    return ((index % max) + max) % max;
  },

  dump: function () {
    return _.map( _.range(this.numSteps), function ( i ) {
      return this.eventAt(i).level;
    }, this);
  }
});
