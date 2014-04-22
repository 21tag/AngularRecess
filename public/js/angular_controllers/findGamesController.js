angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', '$rootScope', '$location', 'angularGames', function($scope, $rootScope, $location, angularGames) {
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
  angular.extend($scope, {
    map: {
      control: {},
      zoom: 14,
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
        tilesloaded: function (mapModel, eventName, originalEventArgs) {
          $scope.map.marker = {};
          var e = originalEventArgs[0];
          $scope.$apply();
        }
      }
    }
  });

  $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.$apply();
      console.log(position);
    });
  };
  $scope.mapUser();

  $scope.game = [];

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

  //apr12 added
  $scope.filterOrg = function(data){
    // console.log('data._id', data._id)
    // console.log('$rootScope.currentUser.upcomingGames', $rootScope.currentUser.upcomingGames)
    return !_.contains($rootScope.currentUser.upcomingGames, data._id);
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
      _.each($scope.game, function(item, index){
        console.log('item', item);
        console.log('item.minimumPlayers', item.minimumPlayers);
        console.log('item.confirmedPlayers', item.confirmedPlayers);
        item.playersNeeded = item.minimumPlayers - item.confirmedPlayers.length;
        console.log('item.playersNeeded', item.playersNeeded);
      });
    });
  };

  //apr12 added
  $scope.selectGame = function(data, index){
    // console.log('hit scope.game', $scope.game);
    // console.log('hit data', data);
    // console.log('hit index', index);
    $rootScope.joinGameList = undefined; 
    $rootScope.joinGameList = data;
    // $scope.game.splice(index, 1);
    console.log($rootScope.joinGameList);
    $location.path('/seeGame');
  };
  
  console.log($rootScope.currentUser);
  // $scope.moveToJoinGame = function(){
  //   $location.path('/seeGame');
  // };

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
