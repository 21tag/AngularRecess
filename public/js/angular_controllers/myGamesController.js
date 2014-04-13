angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', 'angularGetGames', function($rootScope, $scope, angularGetGames) {
    $scope.show = true;

    //apr12 added
    $scope.gameId = $rootScope.currentUser.id;
    console.log($scope.gameId);
    
    $scope.getMyGames = function () {
      angularGetGames.get($scope.gameId, function(returnedGame, response) {
        if (returnedGame) {
          console.log(returnedGame);
          $scope.myUpcomingGames = [returnedGame];
        } else {
          $scope.response = response || 'No games found';
        }
      });
    };
    $scope.getMyGames();
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

