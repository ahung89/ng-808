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

  // TODO: Make this configurable
  this.steps = 16;
  this.stepsRange = _.range( this.steps );

  console.log(this.parts);
};
