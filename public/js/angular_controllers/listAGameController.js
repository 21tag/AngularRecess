angular.module('angularListAGame', [])
.controller('listAGameController', ['$scope', '$rootScope', '$location', 'angularListGames', 'angularGetQueryUser', function($scope, $rootScope, $location, angularListGames, angularGetQueryUser) {
  
  angular.extend($scope, {
        map: {
            control: {},
            zoom: 13,
            center: {
              latitude: null,
              longitude: null
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
              tilesloaded: function (map, eventName, originalEventArgs) {
              },
              click: function (mapModel, eventName, originalEventArgs) {
                $scope.map.clickedMarker = {};
                var e = originalEventArgs[0];
                  $scope.map.clickedMarker.latitude = e.latLng.lat();
                  $scope.map.clickedMarker.longitude = e.latLng.lng()
                $scope.$apply();
              }
            }
        }
    });
    $scope.map.clickedMarker = {
      latitude: null,
      longitude: null
    }

    $scope.mapUser = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.map.center.latitude = position.coords.latitude;
        $scope.map.center.longitude = position.coords.longitude;
        $scope.$apply();
      });
    };
  $scope.mapUser();

    $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.marker.latitude = position.coords.latitude;
      $scope.marker.longitude = position.coords.longitude;
    });
    };
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
    user: 'undefined'
  };

  $scope.queryUser = [];
 
  $scope.addToInvitePlayer = function(user){
    var search = _.find($scope.gameInfo.playerArray, function(elem){
      return user.email === elem.email;
    });
    if(!search){
      $scope.gameInfo.playerArray.push(user);
    }
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
    $scope.gameInfo.confirmedPlayers.push({'code':$rootScope.currentUser.id, 'display_name':$rootScope.currentUser.display_name, 'email':$rootScope.currentUser.email});
    $scope.gameInfo.latitude = $scope.map.clickedMarker.latitude;
    $scope.gameInfo.longitude = $scope.map.clickedMarker.longitude;
    $scope.gameInfo.user = $rootScope.currentUser.id;

    if(!_.contains($scope.gameInfo, undefined) && ($scope.date.start < day && $scope.date.end > day) && maximum > minimum){
      $scope.sendGame($scope.gameInfo);
      $scope.response = 'Game Listed Successfully';
      $location.path('/findGames');
    }else if(maximum < minimum){
      alert('check max and min num');
    }
  };
  
  $scope.sendGame = function(game) {
    angularListGames.post('/game', game, function(data) {      
      $('form .sanitize').val('');
      $('form textarea').val('');
      $('select').prop('selectedIndex', 0);
      var num = $scope.gameInfo.playerArray.length;
    });
  };

  $scope.query = function (game) {
    angularGetQueryUser.get(game, function(returnedGame, response) {
      if (returnedGame) {
        var userList = returnedGame;
        userList = _.reject(userList, function(userObj){
          return userObj._id === $rootScope.currentUser.id;
        });
        $scope.queryUser = userList;
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
          cb(undefined, 'Could not retrieve users');
        });
      }
    };
}]);
