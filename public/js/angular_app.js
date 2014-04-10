angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup', 'angularFindGames', , 'angularListGames'])

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);
