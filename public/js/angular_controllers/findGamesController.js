angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', '$rootScope', '$location', 'angularGames', 'googleMapsFind', function($scope, $rootScope, $location, angularGames, googleMapsFind) {

//gives maps atrributes to controller's scope
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
      infoWindow: {
        options: {
          disableAutoPan: true
        },
        show: true
      },
      bounds: {},
      events: {
        tilesloaded: function (mapModel, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
          $scope.$apply();
        }
      }
    }
  });

//finds user and centers map on their location as default
  $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.$apply();
    });
  };

  $scope.mapUser();

//searches for game and location by calling the Googlemaps geocode api
  $scope.findLocation = function(gameType, location) {
    gameType = gameType || 'All Games';
    location = location || 'San Francisco';
    googleMapsFind.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true', function(data) {
      var foundLocation = data.results[0].geometry.location;
      $scope.map.center.latitude = foundLocation.lat;
      $scope.map.center.longitude = foundLocation.lng;
      $scope.retreiveGames(gameType);
    });
  };

//declaring markers here prevents error on map load if retrieveGames function does not return before map load
  $scope.map.markers = [];

//fetches games, and adds them to the map if their gameType matches the searched game.
  $scope.retreiveGames = function(gameSearched){
    $scope.map.markers = [];
    angularGames.get('/games', function(data) {
      $scope.game = data;
      _.each($scope.game, function(game) {
        if (game.coord && gameSearched === 'All Games'){
          $scope.map.markers.push({latitude: game.coord.lat, longitude: game.coord.lon, name: game.gameName, type: game.gameType});
        }
        else if (game.coord && gameSearched === game.gameType) {
          $scope.map.markers.push({latitude: game.coord.lat, longitude: game.coord.lon, name: game.gameName, type: game.gameType});
        }
      });
      _.each($scope.game, function(item, index){
        item.playersNeeded = item.minimumPlayers - item.confirmedPlayers.length;
      });
    });
  };

//initializes markers for all games on map.
  $scope.retreiveGames('All Games');

  $scope.selectGame = function(data, index){
    $rootScope.joinGameList = undefined;
    $rootScope.joinGameList = data;
    $location.path('/seeGame');
  };

  $scope.filterOrg = function(data){
    return !_.contains($rootScope.currentUser.upcomingGames, data._id);
  };

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

