describe( 'Part', function () {
  beforeEach( function () {
    this.part = new Part({name: "Kick"});
  });

  it( 'should have a name attribute', function () {
    expect( this.part.name ).toBe("Kick");
  });
});
