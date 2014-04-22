angular.module('angularSeeGame', ['google-maps'])
  .controller('seeGameController', ['$rootScope', '$scope', '$location', 'angularPutGame', 'angularPutUser', 'angularGetGames', function($rootScope, $scope, $location, angularPutGame, angularPutUser, angularGetGames) {
    angular.extend($scope, {
        map: {
            control: {},
            zoom: 13,
            center: {
              latitude: 37.7836083,
              longitude: -122.40927020000001
            },
            options: {
                streetViewControl: false,
                panControl: false,
                maxZoom: 20,
                minZoom: 3
            },
            dragging: true,
            bounds: {},
            events: {
              tilesloaded: function (mapModel, eventName, originalEventArgs) {
                $scope.map.marker = {};
                var e = originalEventArgs[0];
                  $scope.map.marker.latitude = $scope.game.coord.lat;
                  $scope.map.marker.longitude = $scope.game.coord.lon;
                $scope.$apply();
              }
            }
        }
    });

    $scope.map.marker = {
      latitude: 37.74757548736071,
      longitude: -122.37894058227539
    }
    $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.marker.latitude = position.coords.latitude;
      $scope.marker.longitude = position.coords.longitude;
    });
    };

    $scope.moveToFindGames = function(){
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
          console.log('error fetching game');
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
