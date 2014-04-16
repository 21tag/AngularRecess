angular.module('angularListAGame', [])
.controller('listAGameController', ['$scope', '$rootScope', 'angularListGames', 'angularGetQueryUser',function($scope, $rootScope, angularListGames) {
  // $scope.game = {
  //   gameName: 'undefined',
  //   gameType: 'undefined',
  //   gameDescription: 'undefined',
  //   gameDate: 'undefined',
  //   gameTime: 'undefined',
  //   minimumPlayers: 'undefined',
  //   playersLimit: 'undefined',
  //   playerArray: 'undefined',
  // };
  $scope.date = {
    start: 'undefined',
    end: 'undefined'
  }

  var newDate = new Date();
  var convertTwoDigit = function(num){
    return num > 9 ? '' + num : '0' + num;
  };
  var dateMaker = function(y, m, d){
    return (newDate.getFullYear() + y) + '-' +   convertTwoDigit((newDate.getMonth() + 1) + m) + '-' + convertTwoDigit(newDate.getDate() + d);
  }
  $scope.date.start = dateMaker(0,0,0);
  $scope.date.end = dateMaker(1,0,0);
  console.log($scope.date);

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

  $scope.gameInfo = {
    gameName: 'undefined',
    gameType: 'undefined',
    gameDescription: 'undefined',
    gameDate: 'undefined',
    gameTime: 'undefined',
    minimumPlayers: 'undefined',
    playerLimit: 'undefined',
    playerArray: [],

    //12apr added
    user: 'undefined'
  };

  $scope.sports = [
    'Badminton',
    'Baseball',
    'Basketball',
    'Billiards',
    'Board Games',
    'Bocce',
    'Bowling',
    'Capture the Flag',
    'Cards',
    'Checkers',
    'Chess',
    'Climbing',
    'Cricket',
    'D&D',
    'Disc Golf',
    'Dodgeball',
    'Dominoes',
    'Flag Football',
    'Football',
    'Foursquare',
    'Go',
    'Golf',
    'Ice Hockey',
    'Kickball',
    'Lacrosse',
    'Martial Arts',
    'Quidditch',
    'Racquetball',
    'Rugby',
    'Shuffleboard',
    'Soccer',
    'Softball',
    'Speed-ball',
    'Squash',
    'Street Hockey',
    'Tag',
    'Tennis',
    'Tennis (doubles)',
    'Ultimate Frisbee',
    'Volleyball',
    'Water Polo',
    'Wiffleball',
    'Yoga',
    'Other',
  ];


  //apr16 added


  $scope.allAvailableUsers = $rootScope.allUsers;

  $scope.addToInvitePlayer = function(user){
    $scope.gameInfo.playerArray.push(user);
  };

  $scope.removeFromAllusers = function(index){
    $scope.allAvailableUsers[index].refNo = index;
    $scope.allAvailableUsers.splice(index, 1);
  };
  
  $scope.addToAllUsers = function(user){
    $scope.allAvailableUsers.splice(user.refNo, 0, user);
  };

  $scope.removeFromInvitePlayer = function(index){
    $scope.gameInfo.playerArray.splice(index,1);
  };


  $scope.submitTheForm = function(name, type, description, day, time, minimum, maximum, invited) {
    $scope.gameInfo.gameName = name;
    $scope.gameInfo.gameType = type;
    $scope.gameInfo.gameDescription = description;
    $scope.gameInfo.gameDate = day;
    $scope.gameInfo.gameTime = time;
    $scope.gameInfo.minimumPlayers = minimum;
    $scope.gameInfo.playerLimit = maximum;
    $scope.gameInfo.playerArray  = invited;
    console.log($scope.gameInfo);

    //apr12 added
    console.log('$rootScope.currentUser', $rootScope.currentUser);
    $scope.gameInfo.user = $rootScope.currentUser.id;

    //apr14 added
    if(!_.contains($scope.gameInfo, undefined)){
      $scope.sendGame($scope.gameInfo);
    }
  };

  $scope.sendGame = function(game) {
    angularListGames.post('/game', game, function(data) {
      console.log('posted');
    });
  };


//4/8
  // $scope.retreiveGames = function(){
  //   angularGames.get('/games', function(data) {
  //     $scope.game = data;
  //     console.log('list retrieve success');
  //   });
  // };

  // $scope.retreiveGames();
//
}])

.factory('angularListGames', ['$http', function($http){
  return{
    post: function(url, gameData, cb) {
      var postData = $http.post(url, gameData);
      postData.success(function(data) {
        cb(data);
      });
      postData.error(function(error) {
        console.log(error);
      });
    },
//4/8
    // get: function(url ,cb) {
    //   var getData = $http.get(url);
    //   getData.success(function(data) {
    //     cb(data);
    //   });
    //   getData.error(function(error) {
    //     console.log(error);
    //   });
    // }
//

  };
}])

.factory('angularGetQueryUser', ['$http', function($http) {
    return {
      get: function(gameId, cb) {
        var getGames = $http.get('/users/' + gameId, cb);
        getGames.success(function(data) {
          cb(data);
        });
        getGames.error(function() {
          cb(undefined, 'Could not retrieve games');
        });
      }
    };
}]);


