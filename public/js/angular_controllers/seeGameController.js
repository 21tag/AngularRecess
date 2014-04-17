angular.module('angularSeeGame', [])
  .controller('seeGameController', ['$rootScope', '$scope', '$location', 'angularPutGame', 'angularPutUser', 'angularGetGames', function($rootScope, $scope, $location, angularPutGame, angularPutUser, angularGetGames) {
    

    //apr13 added
    $scope.moveToFindGames = function(){
      $location.path('/findGames');
    };

    if($rootScope.joinGameList === undefined){
      $scope.moveToFindGames();
    }else{
      $scope.gameId = $rootScope.joinGameList._id;
    }


    $scope.getGameById = function() {
      angularGetGames.get($scope.gameId, function(returnedGame, response) {
        if (returnedGame) {
          $scope.game = returnedGame;
          $scope.game.playersNeeded = ($scope.game.playerLimit - $scope.game.confirmedPlayers.length);
        } else {
          console.log('error');
        }
      });
    }

    $scope.getGameById();

    $scope.addUserToGame = function() {
      angularPutGame.put($scope.gameToSend, function(result, response) {
        $scope.response = response;
        if (result === 'success') {
          $scope.addGameToUser();
          $scope.getGameById();
        }
      });
    };

    $scope.addGameToUser = function() {
      if (!_.contains($rootScope.currentUser.upcomingGames, $scope.gameToSend.code)) {
        $rootScope.currentUser.upcomingGames.push($scope.gameToSend.code);
      }
      angularPutUser.put($scope.userToSend, function(data) {
        console.log(data);
      });

      //apr12 added
      //$location.path('/myGames');


    };

    $scope.joinGame = function () {
      $scope.gameToSend = {};
      $scope.gameToSend.code = $scope.gameId;
      $scope.gameToSend.phone = $rootScope.currentUser.phone;
      $scope.addUserToGame();
      $scope.userToSend = {};
      $scope.userToSend.id = $rootScope.currentUser.id;
      $scope.userToSend.game = $scope.gameId;

    };

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

