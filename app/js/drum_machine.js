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

  this.sequences = {
    "Cybotron - Clear": {"Shaker":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Kick":[1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],"Snare":[0,0,0,0,1,0,0,0],"LoConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"MidConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"HiConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"CowBell":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Rim":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Clap":[0,0,0,0,1,0,0,0],"Ride":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"OpenHat":[0,0,0,0,1,0,0,0],"ClosedHat":[1,1,1,1,0,0,0,0]},

    "Afrika Bambaataa - Planet Rock 1": {"Shaker":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Kick":[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0],"Snare":[0,0,0,0,1,0,0,0],"LoConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"MidConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"HiConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"CowBell":[1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0],"Rim":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Clap":[0,0,0,0,1,0,0,0],"Ride":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"OpenHat":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"ClosedHat":[1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1]},

    "Afrika Bambaataa - Planet Rock 2": {"Shaker":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Kick":[1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],"Snare":[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],"LoConga":[0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],"MidConga":[1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],"HiConga":[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],"CowBell":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Rim":[0,0,0,0,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1,1,0],"Clap":[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],"Ride":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"OpenHat":[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],"ClosedHat":[1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0]},
    
    "Adonis - No Way Back": {"Kick":[1,0,0,0],"Snare":[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0],"LoConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"MidConga":[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],"HiConga":[0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],"Rim":[0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0,0,0,1,0,1],"Clap":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0],"CowBell":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Ride":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"OpenHat":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"ClosedHat":[1,1],"Shaker":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

   "BB & Q Band - Genie ": {"Kick":[1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],"Snare":[0,0,0,0,1,0,0,0],"LoConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"MidConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],"HiConga":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Rim":[0,0,0,0,0,1,1,1],"Clap":[0,0,0,0,1,0,0,0],"CowBell":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Ride":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"OpenHat":[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],"ClosedHat":[1,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0],"Shaker":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

    "Init": {}
  };

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

      this.$timeout( _.bind(this.tick, this), this.clock.stepLength() );
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
    this.clearAllSequences();

    _.each( sequence, function ( levels, partName ) {
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

    return dump;
  }
});
