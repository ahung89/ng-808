var Part = function ( attributes ) {
  this.name       = attributes.name;
  this.sampleName = attributes.sampleName;
  this.sequence   = new Sequence();

  this.initAudio();
  this.reset();
};

_.extend( Part.prototype, {
  advanceSequence: function () {
    this.currentEvent = this.sequence.next();
  },

  reset: function () {
    this.sequence.reset();
    this.advanceSequence();
  },

  samplePath: function () {
    return "samples/" + this.sampleName + ".wav";
  },

  initAudio: function () {
    if ( this.sampleName ) {
      this.sample = new Wad({
        source: this.samplePath(),
        volume: 0.0
      });
    }
  },

  playEvent: function ( event ) {
    if ( !this.sample ) { return; }

    if ( typeof(event) === "undefined" ) {
      event = this.currentEvent;
    }

    this.sample.play({volume: event.level});
  },

  loadSequence: function ( levels ) {
    this.sequence.loadSteps( levels );
    this.currentEvent = this.sequence.currentEvent();
  }
});
