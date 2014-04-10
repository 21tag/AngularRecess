angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.showUpcoming = true;
    $scope.showPlayed = true;
    $scope.getMyGames = function () {
      $scope.myUpcomingGames = $rootScope.currentUser.upcomingGames;
      $scope.myPlayedGames = $rootScope.currentUser.gamesPlayed;
    };
    $scope.getMyGames();
  }]);

