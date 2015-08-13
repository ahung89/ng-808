var sm808 = angular.module("sm808", [])

.controller("MainController", function ( $scope ) {
  $scope.data = [
    {name: "Leigh", color: "red"},
    {name: "Waffles", color: "potato"}
  ];
});
