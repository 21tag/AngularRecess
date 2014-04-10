angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.showUpcoming = true;
    $scope.showPlayed = true;
    $scope.getMyGames = function () {
      $rootScope.currentUser.gamesPlayed.push('sample played game');
      $scope.myUpcomingGames = $rootScope.currentUser.upcomingGames;
      $scope.myPlayedGames = $rootScope.currentUser.gamesPlayed;
    };
    $scope.getMyGames();
  }]);


  // .factory('angularGetMyGames', ['$http', function($http) {
  //   return {
  //     get: function(cb) {
  //       var getGames = $http.get('/game', cb);
  //       getGames.success(function(data) {
  //         cb(data);
  //       });
  //       getGames.error(function() {
  //         cb('Something went wrong, please try again');
  //       });
  //     }
  //   };
  // }]);
