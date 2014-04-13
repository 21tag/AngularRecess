angular.module('angularSeeGame', [])
  .controller('seeGameController', ['$rootScope', '$scope', '$location','angularPutGame', 'angularPutUser', function($rootScope, $scope, $location, angularPutGame, angularPutUser) {
    
    //apr12 added
    $scope.headers = [
      'gameName',
      'gameType',
      'gameDescription',
      'gameDate',
      'gameTime',
      'minimumPlayers',
      'playersLimit',
      'playerArray',
    ];

    $scope.addToGame = function() {
      angularPutGame.put($scope.game, function(result, response) {
        $scope.response = response;
        if (result === 'success') {
          $scope.addGameToUser();
        }
      });
    };

    $scope.addGameToUser = function() {
      angularPutGame.put($scope.game, function(result, response) {
        $scope.response = response;
        if (result === 'success') {

          //apr12 added
          for(var i=0; i < $scope.game.length; i++){
            $rootScope.currentUser.upcomingGames.push($scope.game[i].id);            
          }
          // $rootScope.currentUser.upcomingGames.push($scope.game.code);
          // $rootScope.currentUser.gamesPlayed.push($scope.game.code);
          angularPutUser.put($rootScope.currentUser, function(data) {                  
            console.log(data);
          });

          //apr12 added
          $rootScope.joinGameList = [];
          $location.path('/myGames');

        }
      });
    };

    //apr12 added
    $scope.game = $rootScope.joinGameList;

    $scope.joinGame = function () {
      console.log('joined!');
      
      // $scope.game.code = 123;
      // $scope.game.phone = $rootScope.currentUser.phone;

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

