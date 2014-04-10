angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', 'angularGames', function($scope, angularGames) {
  $scope.game = {
    gameName: 'undefined',
    gameType: 'undefined',
    gameDescription: 'undefined',
    gameDate: 'undefined',
    gameTime: 'undefined',
    minimumPlayers: 'undefined',
    playersLimit: 'undefined',
    playerArray: 'undefined',
  };
  
  // $scope.headers = [
  //   'gameName',
  //   'gameType',
  //   'gameDescription',
  //   'gameDate',
  //   'gameTime',
  //   'minimumPlayers',
  //   'playersLimit',
  //   'playerArray',
  // ];

  // $scope.gameInfo = {
  //   gameName: 'undefined',
  //   gameType: 'undefined',
  //   gameDescription: 'undefined',
  //   gameDate: 'undefined',
  //   gameTime: 'undefined',
  //   minimumPlayers: 'undefined',
  //   playerLimit: 'undefined',
  //   playerArray: 'undefined'
  // };

  // $scope.sports = [
  //   'Badminton',
  //   'Baseball',
  //   'Basketball',
  //   'Billiards',
  //   'Board Games',
  //   'Bocce',
  //   'Bowling',
  //   'Capture the Flag',
  //   'Cards',
  //   'Checkers',
  //   'Chess',
  //   'Climbing',
  //   'Cricket',
  //   'D&D',
  //   'Disc Golf',
  //   'Dodgeball',
  //   'Dominoes',
  //   'Flag Football',
  //   'Football',
  //   'Foursquare',
  //   'Go',
  //   'Golf',
  //   'Ice Hockey',
  //   'Kickball',
  //   'Lacrosse',
  //   'Martial Arts',
  //   'Quidditch',
  //   'Racquetball',
  //   'Rugby',
  //   'Shuffleboard',
  //   'Soccer',
  //   'Softball',
  //   'Speed-ball',
  //   'Squash',
  //   'Street Hockey',
  //   'Tag',
  //   'Tennis',
  //   'Tennis (doubles)',
  //   'Ultimate Frisbee',
  //   'Volleyball',
  //   'Water Polo',
  //   'Wiffleball',
  //   'Yoga',
  //   'Other',
  // ];

  // $scope.submitTheForm = function(name, type, description, day, time, minimum, maximum, invited) {
  //   $scope.gameInfo.gameName = name;
  //   $scope.gameInfo.gameType = type;
  //   $scope.gameInfo.gameDescription = description;
  //   $scope.gameInfo.gameDate = day;
  //   $scope.gameInfo.gameTime = time;
  //   $scope.gameInfo.minimumPlayers = minimum;
  //   $scope.gameInfo.playerLimit = maximum;
  //   $scope.gameInfo.playerArray  = invited;
  //   console.log($scope.gameInfo);
  //   $scope.sendGame($scope.gameInfo);
  // };

  // $scope.sendGame = function(game) {
  //   angularGames.post('/game', game, function(data) {
  //     console.log('posted');
  //   });
  // };
//4/8
  $scope.retreiveGames = function(){
    angularGames.get('/games', function(data) {
      $scope.game = data;
      console.log('list retrieve success');
    });
  };

  $scope.retreiveGames();
//
}])

.factory('angularGames', ['$http', function($http){
  return{
    // post: function(url, gameData, cb) {
    //   var postData = $http.post(url, gameData);
    //   postData.success(function(data) {
    //     cb(data);
    //   });
    //   postData.error(function(error) {
    //     console.log(error);
    //   });
    // },

//4/8
    get: function(url ,cb) {
      var getData = $http.get(url);
      getData.success(function(data) {
        cb(data);
      });
      getData.error(function(error) {
        console.log(error);
      });
    }
//

  };
}]);
