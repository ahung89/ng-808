var sm808 = angular.module("sm808", [])

.controller("MainController", function ( $scope ) {
  $scope.drumMachine = new DrumMachine();

  $scope.toggleLevel = function ( event ) {
    event.level = ( event.level + 64 );

    if ( event.level > 128 ) {
      event.level = 0;
    }
  };
});
