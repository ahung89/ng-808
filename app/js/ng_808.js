var ng808 = angular.module("ng808", [])

.controller("MainController", function ( $scope, $timeout ) {
  $scope.drumMachine = new DrumMachine({$timeout: $timeout});

  var helpers = {
    toggleLevel: function ( part, event, $event ) {
      var add;

      if ( $event.shiftKey ) {
        add = 1.0;
      }
      else {
        add = 0.5;
      }

      event.level = ( event.level + add );

      if ( event.level > 1 ) {
        event.level = 0;
      }

      part.playEvent( event );
    },

    cellClass: function ( part, index ) {
      if ( part.sequence.currentStep === index ) {
        return "current";
      }
      else {
        return "";
      }
    },

    eventCellClass: function ( part, event, index ) {
      var descriptors = [];

      descriptors.push( this.cellClass(part, index) );
      descriptors.push( {0: "off", 0.5: "on", 1: "accent"}[event.level] );

      if ( index >= part.sequence.numSteps ) {
        descriptors.push( "ghost" );
      }

      return descriptors.join(" ");
    },

    lastClass: function ( last ) {
      if ( last ) {
        return "last";
      }
      else {
        return "";
      }
    },

    playButtonClass: function () {
      if ( this.drumMachine.playing ) {
        return "pause";
      }
      else {
        return "play";
      }
    },

    activateDump: function () {
      this.showDump = true;
    },

    dumpSequence: function () {
      console.log( JSON.stringify( this.drumMachine.dumpSequence() ) );
    }
  };

  _.extend( $scope, helpers );
});
