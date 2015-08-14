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
    this.playSound();
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

  playSound: function () {
    if ( this.sample ) {
      this.sample.play({volume: this.currentEvent.level});
    }
  }
});
