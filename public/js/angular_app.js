angular.module('angularApp', ['angularAppRoutes','angularSplash'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);
