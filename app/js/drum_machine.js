var DrumMachine = function ( attributes ) {
  var partMap = {
    "Kick": "kick_1",
    "Snare": "snare_1",
    "LoConga": "lo_conga",
    "MidConga": "med_conga",
    "HiConga": "hi_conga",
    "Rim": "rim",
    "Clap": "clap",
    "CowBell": "cowbell",
    "Ride": "ride",
    "OpenHat": "open_hat",
    "ClosedHat": "closed_hat",
    "Shaker": "shaker"
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

  this.sequences = DefaultPatterns;

  this.currentSequence = this.sequences['Cybotron - Clear'];

  this.updateSequence();

  this.playing = false;
};

_.extend( DrumMachine.prototype, {
  advanceSequence: function ( by ) {
    this.masterPart.advanceSequence( by );

    _.each( this.parts, function ( part ) {
      part.advanceSequence( by );
    });
  },

  seekTo: function ( n ) {
    this.masterPart.seekTo( n );

    _.each( this.parts, function ( part ) {
      part.seekTo( n );
    });
  },

  advanceAndPlay: function ( by ) {
    this.advanceSequence( by );
    this.playCurrent();
  },

  seekToAndPlay: function ( n ) {
    this.seekTo( n );
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
    else {
      this.pause();
    }
  },

  pause: function () {
    this.playing = false;
  },

  stop: function () {
    if ( this.playing ) {
      this.pause();
    }
    else {
      this.reset();
    }
  },

  tick: function () {
    if ( this.shouldAdvance() ) {
      this.playCurrent();
      this.advanceSequence();

      this.$timeout( _.bind(this.tick, this), this.clock.stepLength( this.masterPart.currentStep ) );
    }
    else {
      this.pause();
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

  clearAllSequences: function () {
    _.each( this.parts, function ( part ) {
      part.clearSequence();
    });
  },

  loadSequence: function ( sequence ) {
    this.clock.tempo        = sequence.tempo;
    this.clock.swingPercent = sequence.swingPercent;

    this.clearAllSequences();

    _.each( sequence.pattern, function ( levels, partName ) {
      var part = this.partsByName[partName];

      if ( part ) {
        part.loadSequence( levels );
      }
    }, this);
  },

  updateSequence: function () {
    this.loadSequence( this.currentSequence );
  },

  dumpSequence: function () {
    var dump = {};

    _.each( this.parts, function ( part ) {
      dump[ part.name ] = part.dumpSequence();
    }, this);

    return {
      tempo: this.clock.tempo,
      swingPercent: this.clock.swingPercent,
      pattern: dump
    };
  }
});
