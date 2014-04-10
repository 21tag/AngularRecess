angular.module('angularListAGame', [])
  .controller('listAGameController', ['$scope', 'angularPostGame', function($scope, angularPostGame) {
    $scope.game = {
      gameName: 'undefined',
      gameType: 'undefined',
      description: 'undefined',
      gameDate: 'undefined',
      gameTime: 'undefined',
      minimumPlayers: 'undefined',
      playersLimit: 'undefined',
      playerArray: 'undefined'
    };

    $scope.submitTheForm = function(name, type, description, day, time, minimum, maximum, invited) {
      $scope.game.gameName = name;
      $scope.game.gameType = type;
      $scope.game.description = description;
      $scope.game.gameDate = day;
      $scope.game.gameTime = time;
      $scope.game.minimumPlayers = minimum;
      $scope.game.playersLimit = maximum;
      $scope.game.playerArray  = invited;
      console.log($scope.game);
      $scope.sendGame($scope.game);
    };

    $scope.sendGame = function(game) {
      angularPostGame.post('/game', game, function(data) {
        console.log('posted');
      });
    };
  }])

  .factory('angularPostGame', ['$http', function($http){
    return{
      post: function(url, gameData, cb) {
        var postData = $http.post(url, gameData);
        postData.success(function(data) {
          cb(data);
        });
        postData.error(function(error) {
          console.log(error);
        });
      }
    };
  }]);
