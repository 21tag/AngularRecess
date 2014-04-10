angular.module('angularSeeGame', [])
  .controller('seeGameController', ['$rootScope', '$scope', 'angularPutGame', function($rootScope, $scope, angularPutGame) {
    $scope.addToGame = function() {
      angularPutGame.put($scope.game, function(result, response) {
        $scope.response = response;
        if (result === 'success') {
          $rootScope.currentUser.upcomingGames.push($scope.game.code);
        }
      });
    };
    $scope.joinGame = function () {
      console.log('joined!');
      $scope.game = {};
      $scope.game.code = 123;
      $scope.game.phone = $rootScope.currentUser.phone;
      $scope.addToGame();
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
  }]);

