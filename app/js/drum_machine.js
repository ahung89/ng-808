var DrumMachine = function () {
  var partNames = [
    "Cymbal",
    "HiHat",
    "Tamb",
    "Cowbell",
    "HiTom",
    "MidTom",
    "LowTom",
    "Snare",
    "Kick",
    "Accent"
  ];

  this.parts = _.map( partNames, function ( name ) {
    return new Part({name: name});
  });

  this.masterPart = new Part({name: "Master"});
};

_.extend( DrumMachine.prototype, {
  advanceSequence: function () {
    this.masterPart.advanceSequence();

    _.each( this.parts, function ( part ) {
      part.advanceSequence();
    });
  }
});
