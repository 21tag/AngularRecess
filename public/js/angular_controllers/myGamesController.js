angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', 'angularGetGames', 'angularGetUser', function($rootScope, $scope, angularGetGames, angularGetUser) {
    $scope.show = true;
    $scope.myUpcomingGames = [];

    $scope.getMyGames = function (game) {
      angularGetGames.get(game, function(returnedGame, response) {
        if (returnedGame) {
          if(returnedGame.manager == $rootScope.currentUser.id){
            returnedGame.gameOwned = 'my game'
          }else{
            returnedGame.gameOwned = 'other game'
          }
          $scope.myUpcomingGames.push(returnedGame);
        } else {
          $scope.response = response || 'No games found';
        }
      });
    };
    
    $scope.getUserInfo = function(user) {
      angularGetUser.get(user, function(data) {
        $scope.currentUser = data;
        _.each($scope.currentUser.upcomingGames, function(game) {
          $scope.getMyGames(game);
        });
      });
    };
    $scope.getUserInfo($rootScope.currentUser.id);

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
  }])
  .factory('angularGetUser', ['$http', function($http) {
    return {
      get: function(userId, cb) {
        var getUsers = $http.get('/users/' + userId, cb);
        getUsers.success(function(data) {
          cb(data);
        });
        getUsers.error(function() {
          cb(undefined, 'Could not retrieve games');
        });
      }
    };
  }]);
