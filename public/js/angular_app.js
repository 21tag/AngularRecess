angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);
