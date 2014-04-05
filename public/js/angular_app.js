angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);
