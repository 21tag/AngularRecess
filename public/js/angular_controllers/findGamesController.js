angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', '$rootScope', '$location', 'angularGames', 'googleMapsFind', function($scope, $rootScope, $location, angularGames, googleMapsFind) {

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
          panControl: true,
          maxZoom: 20,
          minZoom: 3,
          scrollwheel: false
      },
      dragging: true,
      bounds: {},
      events: {
        tilesloaded: function (mapModel, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
          $scope.$apply();
        }
      }
    }
  });

  $scope.map.markers = [];

  $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.$apply();
    });
  };

  $scope.mapUser();

  $scope.findLocation = function() {
    googleMapsFind.get('http://maps.googleapis.com/maps/api/geocode/json?address=porterville&sensor=true', function(data) {
      console.log(data.results[0].geometry.location);
      var foundLocation = data.results[0].geometry.location;
      $scope.map.center.latitude = foundLocation.lat;
      $scope.map.center.longitude = foundLocation.lng;
      console.log($scope.map.center);
    });
  };

  $scope.game = [];

  $scope.filterOrg = function(data){
    return !_.contains($rootScope.currentUser.upcomingGames, data._id);
  };

  $scope.retreiveGames = function(){
    angularGames.get('/games', function(data) {
      $scope.game = data;
      _.each($scope.game, function(game, i) {
        if (game.coord){
          $scope.map.markers.push({latitude: game.coord.lat, longitude: game.coord.lon});
        }
      });
      _.each($scope.game, function(item, index){
        item.playersNeeded = item.minimumPlayers - item.confirmedPlayers.length;
      });
    });
  };

  $scope.selectGame = function(data, index){
    console.log($rootScope.joinGameList);
    $rootScope.joinGameList = undefined;
    $rootScope.joinGameList = data;
    $location.path('/seeGame');
  };

  $scope.retreiveGames();
}])

.factory('angularGames', ['$http', function($http){
  return{
    get: function(url ,cb) {
      var getData = $http.get(url);
      getData.success(function(data) {
        cb(data);
      });
      getData.error(function(error) {
        console.log(error);
      });
    }
  };
}])

.factory('googleMapsFind', ['$http', function($http){
  return{
    get: function(url ,cb) {
      var getData = $http.get(url);
      getData.success(function(data) {
        cb(data);
      });
      getData.error(function(error) {
        console.log(error);
      });
    }
  };
}]);

