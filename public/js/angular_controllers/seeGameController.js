angular.module('angularSeeGame', [])
  .controller('seeGameController', ['$rootScope', '$scope', 'angularPutGame', 'angularPutUser', function($rootScope, $scope, angularPutGame, angularPutUser) {
    $scope.addToGame = function() {
      angularPutGame.put($scope.game, function(result, response) {
        $scope.response = response;
        if (result === 'success') {
          $rootScope.currentUser.upcomingGames.push($scope.game.code);
        }
      });
    };

    $scope.addGameToUser = function() {
      angularPutGame.put($scope.game, function(result, response) {
        $scope.response = response;
        if (result === 'success') {
          $rootScope.currentUser.upcomingGames.push($scope.game.code);
          angularPutUser.put($rootScope.currentUser, function(data) {
            console.log(data);
          });
        }
      });
    };

    $scope.joinGame = function () {
      console.log('joined!');
      $scope.game = {};
      $scope.game.code = 123;
      $scope.game.phone = $rootScope.currentUser.phone;
      $scope.addToGame();
      $scope.addGameToUser();
    };

  }])


  .factory('angularPutGame', ['$http', function($http) {
    return {
      put: function(gameData, cb) {
        var putGame = $http.put('/game', gameData, cb);
        putGame.success(function() {
          cb('success', 'Joined Game!');
        });
        putGame.error(function() {
          cb('error', 'Something went wrong, please try again');
        });
      }
    };
  }])

  .factory('angularPutUser', ['$http', function($http) {
    return {
      put: function(userData, cb) {
        var putUser = $http.put('/users', userData, cb);
        putUser.success(function(data) {
          cb(data);
        });
        putUser.error(function() {
          cb('Something went wrong, please try again');
        });
      }
    };
  }]);

