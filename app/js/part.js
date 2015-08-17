class Part {
  constructor ( attributes = {} ) {
    this.name       = attributes.name;
    this.sampleName = attributes.sampleName;
    this.sequence   = new Sequence();

    this.initAudio();
    this.reset();
  }

  get currentStep () {
    return this.sequence.currentStep;
  }

  advanceSequence ( by ) {
    this.currentEvent = this.sequence.advanceBy( by );
  }

  seekTo ( n ) {
    this.currentEvent = this.sequence.seekTo( n );
  }

  reset () {
    this.sequence.reset();
    this.advanceSequence();
  }

  samplePath () {
    return `samples/${this.sampleName}.wav`;
  }

  initAudio () {
    if ( this.sampleName ) {
      this.sample = new Wad({
        source: this.samplePath(),
        volume: 0.0
      });
    }
  }

  playEvent ( event ) {
    if ( !this.sample ) { return; }

    if ( _.isUndefined(event) ) {
      event = this.currentEvent;
    }

    this.playSample( event.level );
  }

  playSample ( level ) {
    if ( level > 0 ) {
      this.sample.play({
        volume: level,
        callback: () => this.activateVisualizer( level )
      });
    }
  }

  activateVisualizer ( level ) {
    console.log( "activating visualizer", this );
    if ( this.sample.soundSource ) {
      this.bufferOscilloscope.connectStream( this.sample.soundSource );
      this.bufferOscilloscope.level =  level;
    }
  }

  loadSequence ( levels ) {
    this.sequence.loadSteps( levels );
    this.loadCurrentEvent();
  }

  clearSequence () {
    this.sequence.clear();
    this.loadCurrentEvent();
  }

  loadCurrentEvent () {
    this.currentEvent = this.sequence.currentEvent();
  }

  dumpSequence () {
    return this.sequence.dump();
  }

  setupBufferOscilloscope ( element ) {
    this.bufferOscilloscope = new BufferOscilloscope({element: element, sound: this.sample});
    this.bufferOscilloscope.draw();
  }
}
