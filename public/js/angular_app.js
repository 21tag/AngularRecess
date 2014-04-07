angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup', 'angularGames'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);


