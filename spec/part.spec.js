describe( 'Part', function () {
  beforeEach( function () {
    this.part = new Part({name: "Kick"});
  });

  it( 'should have a name attribute', function () {
    expect( this.part.name ).toBe("Kick");
  });

  describe( ".currentStep", function () {
    it ( "should return the current step of the sequence", function () {
      expect( this.part.currentStep ).toEqual( 0 );
    });
  });
});
