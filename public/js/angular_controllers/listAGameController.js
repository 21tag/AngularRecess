angular.module('angularListAGame', [])
.controller('listAGameController', ['$scope', '$rootScope', 'angularListGames', 'angularGetQueryUser', 'getAllUsers',function($scope, $rootScope, angularListGames, angularGetQueryUser, getAllUsers) {
  
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
    confirmedPlayers: [],
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

  $scope.queryUser = [];
 
  var getUsers = function(){
    getAllUsers.get()
      .then(function(users){
        var allAvailableUsers = _.map(_.filter(users, function(item){
          return item._id !== $rootScope.currentUser.id
        }), function(item){
          return _.pick(item, '_id', 'email', 'display_name');
        });
        $scope.allAvailableUsers = allAvailableUsers;
        console.log('$scope.allAvailableUsers', $scope.allAvailableUsers);
      });
  };

  getUsers();

  $scope.addToInvitePlayer = function(user){
    $scope.gameInfo.playerArray.push(user);
    // console.log($scope.gameInfo.playerArray);
  };

  $scope.removeFromAllusers = function(index){
    $scope.allAvailableUsers.splice(index, 1);
    // console.log($scope.allAvailableUsers);
  };
  
  $scope.addToAllUsers = function(user){
    $scope.allAvailableUsers.push(user);
    // console.log($scope.allAvailableUsers);
  };

  $scope.removeFromInvitePlayer = function(index){
    $scope.gameInfo.playerArray.splice(index,1);
    // console.log($scope.gameInfo.playerArray);
  };


  $scope.submitTheForm = function(name, type, description, day, time, minimum, maximum, invited) {
    $scope.gameInfo.gameName = name;
    $scope.gameInfo.gameType = type;
    $scope.gameInfo.gameDescription = description;
    $scope.gameInfo.gameDate = day;
    $scope.gameInfo.gameTime = time;
    $scope.gameInfo.minimumPlayers = minimum;
    $scope.gameInfo.playerLimit = maximum;
    $scope.gameInfo.confirmedPlayers.push({'code':$rootScope.currentUser.id, 'display_name':$rootScope.currentUser.display_name, 'email':$rootScope.currentUser.email});
    console.log($scope.gameInfo.confirmedPlayers);
    console.log($scope.gameInfo.playerArray);
    console.log($scope.gameInfo);

    console.log('$rootScope.currentUser', $rootScope.currentUser);
    $scope.gameInfo.user = $rootScope.currentUser.id;
    console.log('$scope.gameInfo', $scope.gameInfo);

    if(!_.contains($scope.gameInfo, undefined) && ($scope.date.start < day && $scope.date.end > day) && maximum > minimum){
      $scope.sendGame($scope.gameInfo);
      alert('game submitted');

    }else if(maximum < minimum){
      alert('check max and min num');
    }
  };
  
  $scope.sendGame = function(game) {
    angularListGames.post('/game', game, function(data) {      
      console.log('posted');
      $('form .sanitize').val('');
      $('form textarea').val('');
      $('select').prop('selectedIndex', 0);
      var num = $scope.gameInfo.playerArray.length;
      for(var i = 0; i < num; i++){
        $scope.allAvailableUsers.push($scope.gameInfo.playerArray.pop());
      }
    });
  };


  $scope.query = function (game) {
    angularGetQueryUser.get(game, function(returnedGame, response) {
      if (returnedGame) {
        console.log('returnedGame', returnedGame);
        $scope.queryUser = returnedGame;
        console.log('$scope.queryUser', $scope.queryUser);
      } else {
        $scope.response = response || 'No users found';
      }
    });
  };



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
  };
}])

.factory('angularGetQueryUser', ['$http', function($http) {
    return {
      get: function(name, cb) {
        var getGames = $http.get('/search_member/' + name, cb);
        getGames.success(function(data) {
          cb(data);
        });
        getGames.error(function() {
          cb(undefined, 'Could not retrieve games');
        });
      }
    };
}])

.factory('getAllUsers', ['$http', function($http){
  return{
    get: function(cb) {
        return $http.get('/users')
        .then(function(response) {
          return response.data;
        },function(error) {
          console.log(error);
        }
        );
    }
  }
}]);
