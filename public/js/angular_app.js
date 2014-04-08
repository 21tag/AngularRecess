angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup', 'angularGames', 'angularLogout']).run(function($rootScope, $location, $state) {
  $rootScope.currentUser = 'public';
  //checks if requested route is restricted on route change event, redirects to login if it is and user not logged in.
  $rootScope.$on('$stateChangeStart', function(e, goTo, goToParams, from, fromParams) {
    var restricted = ['game', 'manageGames'];
    if (_.contains(restricted, goTo.name) && $rootScope.currentUser === 'public') {
      $rootScope.redirectToState = goTo.name;
      e.preventDefault();
      $state.go('login');
    }
  });
})

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);


