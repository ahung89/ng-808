var BufferOscilloscope = function ( attributes ) {
  this.element = attributes.element;
  this.sound   = attributes.sound;

  this.setup();
};

_.extend( BufferOscilloscope.prototype, {
    setup: function () {
      this.canvas       = this.element[0].getContext('2d');
      this.width        = 128;
      this.height       = 50;
      this.level        = 0.0;
      this.audioContext = this.sound.destination.context;
      this.analyser     = this.audioContext.createAnalyser();

      this.analyser.fftSize = 1024;
      this.bufferLength     = this.analyser.frequencyBinCount;

      this.tickWidth        = this.width / 32;
      this.scaledBuffer     = new Uint8Array(this.width);
      this.dataArray        = new Uint8Array(this.bufferLength);
      this.freqArray        = new Uint8Array(this.bufferLength);

      this.initBuffer( this.scaledBuffer, 128 );
    },

    connectStream: function ( stream ) {
      this.currentStream = stream;

      this.currentStream.connect( this.analyser );
    },

    prepareScaledBuffer: function () {
      // Move all the existing values left by one tick
      this.scaledBuffer.copyWithin(0, this.tickWidth);

      this.previousBuffer = _.clone( this.dataArray );

      // Copy this window's values to a buffer
      this.analyser.getByteTimeDomainData( this.dataArray );

      if ( this.isDuplicate() ) {
        this.initBuffer( this.dataArray, 128 );
      }

      // Copy this window's frequency values to another buffer
      this.analyser.getByteFrequencyData( this.freqArray );

      var sliceWidth = this.bufferLength * 1.0 / this.tickWidth;

      var x = 0;

      var silent = this.isSilent();

      for ( var i = this.width - this.tickWidth; i < this.width; i += 1 ) {
        this.scaledBuffer[i] = this.normalizeAndScale( this.dataArray[x], this.level );

        x = Math.round(x + sliceWidth);
      }
    },

    isSilent: function () {
      return _.all( this.scaledBuffer, function ( f ) {
        return (f < 130) && (f > 125);
      });
    },

    isDuplicate: function () {
      return _.all( this.dataArray, function ( f, index ) {
        return f === this.previousBuffer[ index ];
      }, this);
    },

    normalizeAndScale: function ( level, scale ) {
      var normalized = level - 128;
      var scaled     = normalized * scale;

      return scaled + 128;
    },

    initBuffer: function ( buffer, value ) {
      for ( var i = 0; i < buffer.length; i += 1 ) {
        buffer[i] = value;
      }
    },

    draw: function () {
      requestAnimationFrame( _.bind( this.draw, this ) );

      this.prepareScaledBuffer();

      this.canvas.fillStyle = 'rgb(255, 255, 255)';
      this.canvas.fillRect(0, 0, this.width, this.height);
      this.canvas.lineWidth = 1;

      if ( this.isSilent () ) {
        this.canvas.strokeStyle = 'rgb(255, 255, 255)';
      }
      else {
        this.canvas.strokeStyle = 'rgb(0, 0, 0)';
      }

      this.canvas.beginPath();

      var sliceWidth = 1;
      var x = 0;

      for( var i = 0; i < this.scaledBuffer.length; i++ ) {
        var v = this.scaledBuffer[i] / 128.0;
        var y = v * this.height / 2;

        if ( i === 0 ) {
          this.canvas.moveTo(x, y);
        }
        else {
          this.canvas.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.canvas.lineTo(this.canvas.width, this.canvas.height / 2);
      this.canvas.stroke();

      // var midPoint = (this.height / 2.0);

      // this.canvas.beginPath();
      // this.canvas.lineWidth = 2;
      // this.canvas.strokeStyle = 'rgb(255, 255, 255)';
      // this.canvas.moveTo(0, midPoint);
      // this.canvas.lineTo(this.width, midPoint);
      // this.canvas.stroke();
    }
});
