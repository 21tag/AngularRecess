angular.module('angularApp', ['angularAppRoutes','angularSplash', 'angularAuth', 'angularSignup', 'angularGames', 'angularLogout']).run(function($rootScope, $location, $state) {
  $rootScope.currentUser = 'public';
  $rootScope.$on('$stateChangeStart', function(e, goTo, goToParams, from, fromParams) {
    //console.log($rootScope.currentUser);
    var restricted = ['game', 'manageGames'];
    if (_.contains(restricted, goTo.name) && $rootScope.currentUser === 'public') {
      console.log('restricted');
      e.preventDefault();
      $state.transitionTo('login');
    }
  });
})

.controller('mainController', ['$scope', function($scope) {
  $scope.text = 'mainController text';
}]);


