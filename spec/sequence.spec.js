describe( 'Sequence', function () {
  beforeEach( function () {
    this.attributes = {steps: 16, levels: _.range(16)};

    this.sequence = new Sequence(this.attributes);
  });

  describe( ".next()", function () {
    describe( "with a length of 16", function () {
      it( 'should repeat the entire sequence', function () {
        var levels = _.map( _.range(32), function () {
          return this.sequence.next().level;
        }, this);

        var expectedLevels = _.range(16).concat(_.range(16));

        expect( levels ).toEqual( expectedLevels );
      });
    });

    describe( "with a shorter length", function () {
      beforeEach( function () {
        this.sequence.numSteps = 12;
        this.sequence.reset();
      });

      it( 'should repeat 12 steps and loop', function () {
        var levels = _.map( _.range(32), function () {
          return this.sequence.next().level;
        }, this);

        expect( levels ).toEqual(
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            0, 1, 2, 3, 4, 5, 6, 7
          ]
        );
      });
    });
  });
});
