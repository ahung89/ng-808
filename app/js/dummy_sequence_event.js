class DummySequenceEvent {
  constructor( attributes = {} ) {
    this.originalEvent = attributes.originalEvent;
  }

  get level () {
    return this.originalEvent.level;
  }

  set level ( level ) {
    this.originalEvent.level = level;
  }
}
