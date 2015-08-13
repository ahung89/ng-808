describe( 'Clock', function () {
  beforeEach( function () {
    this.attributes = {tempo: 60};

    this.clock = new Clock(this.attributes);
  });

  it( 'should take a tempo', function () {
    expect( this.clock.tempo ).toBe( 60 );
  });

  describe( ".stepLength()", function () {
    describe( "with a tempo of 60", function () {
      it( 'should equal 250ms', function () {
        expect( this.clock.stepLength() ).toEqual( 250 );
      });
    });

    describe( "with a tempo of 172", function () {
      beforeEach( function () {
        this.clock.tempo = 172;
      });

      it( 'should equal 87.2093ms', function () {
        expect( this.clock.stepLength() ).toBeCloseTo( 87.2093 );
      });
    });
  });
});
