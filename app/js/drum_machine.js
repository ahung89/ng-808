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
};
