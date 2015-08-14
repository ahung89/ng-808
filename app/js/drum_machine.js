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

  this.partsByName = {};

  _.each( this.parts, function ( part ) {
    this.partsByName[part.name] = part;
  }, this);

  this.masterPart = new Part({name: "Master"});
  this.clock      = new Clock({tempo: 128});

  this.defaultSequence = {
    "Kick":    [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0],
    "OpenHat": [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]
  };

  this.loadSequence( this.defaultSequence );

  this.playing = false;
};

_.extend( DrumMachine.prototype, {
  advanceSequence: function () {
    this.masterPart.advanceSequence();

    _.each( this.parts, function ( part ) {
      part.advanceSequence();
    });
  },

  advanceAndPlay: function () {
    this.advanceSequence();
    this.playCurrent();
  },

  playCurrent: function () {
    _.each( this.parts, function ( part ) {
      part.playEvent();
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
      this.playCurrent();
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
  },

  loadSequence: function ( sequence ) {
    _.each( sequence, function ( levels, partName ) {
      var part = this.partsByName[partName];

      if ( part ) {
        part.loadSequence( levels );
      }
    }, this);
  }
});
