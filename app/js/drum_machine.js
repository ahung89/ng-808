var DrumMachine = function ( attributes ) {
  var partMap = {
    "Shaker": "shaker",
    "Kick": "kick_1",
    "Snare": "snare_1",
    "LoConga": "lo_conga",
    "MidConga": "med_conga",
    "HiConga": "hi_conga",
    "CowBell": "cowbell",
    "Rim": "rim",
    "Clap": "clap",
    "Ride": "ride",
    "OpenHat": "open_hat",
    "ClosedHat": "closed_hat"
  };

  this.$timeout = attributes.$timeout;

  this.parts = _.map( partMap, function ( sampleName, name ) {
    return new Part({name: name, sampleName: sampleName});
  });

  this.masterPart = new Part({name: "Master"});
  this.clock      = new Clock({tempo: 128});

  this.playing = false;
};

_.extend( DrumMachine.prototype, {
  advanceSequence: function () {
    this.masterPart.advanceSequence();

    _.each( this.parts, function ( part ) {
      part.advanceSequence();
    });
  },

  reset: function () {
    this.masterPart.reset();

    _.each( this.parts, function ( part ) {
      part.reset();
    });
  },

  play: function () {
    if ( !this.playing ) {
      this.playing = true;

      this.tick();
    }
  },

  stop: function () {
    this.playing = false;
  },

  tick: function () {
    if ( this.shouldAdvance() ) {
      this.advanceSequence();

      this.$timeout( _.bind(this.tick, this), this.clock.stepLength() );
    }
    else {
      this.stop();
    }
  },

  canPlay: function () {
    return !this.playing && this.clock.validTempo();
  },

  canStop: function () {
    return this.shouldAdvance();
  },

  shouldAdvance: function () {
    return this.playing && this.clock.validTempo();
  }
});
