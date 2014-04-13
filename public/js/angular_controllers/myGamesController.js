angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', 'angularGetGames', function($rootScope, $scope, angularGetGames) {
    $scope.show = true;
    $scope.myUpcomingGames = [];
    $scope.getMyGames = function (game) {
      angularGetGames.get(game, function(returnedGame, response) {
        if (returnedGame) {
          $scope.myUpcomingGames.push(returnedGame);
        } else {
          $scope.response = response || 'No games found';
        }
      });
    };

    _.each($rootScope.currentUser.upcomingGames, function(game) {
      $scope.getMyGames(game)
    });
    console.log($rootScope.currentUser);
  }])

  .factory('angularGetGames', ['$http', function($http) {
    return {
      get: function(gameId, cb) {
        var getGames = $http.get('/games/' + gameId, cb);
        getGames.success(function(data) {
          cb(data);
        });
        getGames.error(function() {
          cb(undefined, 'Could not retrieve games');
        });
      }
    };
  }]);

