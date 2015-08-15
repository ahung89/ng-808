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

      describe( "with a clock swing", function () {
        beforeEach( function () {
          this.clock.swingPercent = 50;
        });

        it( "should add time for odd steps", function () {
          expect( this.clock.stepLength(1) ).toEqual( 250 + 125 );
        });

        it( "should subtract time for even steps", function () {
          expect( this.clock.stepLength(0) ).toEqual( 250 - 125 );
        });
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

  describe( "swingPercent", function () {
    it( "should set the swing value", function () {
      this.clock.swingPercent = 50;

      expect( this.clock.swing ).toEqual( 0.5 );
    });

    it( "should scale the swing value up", function () {
      this.clock.swing = 0.1;

      expect( this.clock.swingPercent ).toEqual( 10 );
    });
  });
});
