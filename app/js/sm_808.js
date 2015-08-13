var sm808 = angular.module("sm808", [])

.controller("MainController", function ( $scope ) {
  $scope.drumMachine = new DrumMachine();
});
