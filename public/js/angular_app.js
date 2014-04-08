angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup', 'angularGames', 'angularLogout'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);


