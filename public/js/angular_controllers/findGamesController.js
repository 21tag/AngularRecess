angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', '$rootScope', '$location', 'angularGames', function($scope, $rootScope, $location, angularGames) {

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
          panControl: true,
          maxZoom: 20,
          minZoom: 3,
          scrollwheel: false
      },
      marker: {
                latitude: 37.74757548736071,
                longitude: -122.37894058227539
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

  $scope.map.marker = {
    latitude: 37.74757548736071,
    longitude: -122.37894058227539
  };

  $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.$apply();
    });
  };
  $scope.mapUser();

  $scope.game = [];

  $scope.filterOrg = function(data){
    return !_.contains($rootScope.currentUser.upcomingGames, data._id);
  };

  $scope.retreiveGames = function(){
    angularGames.get('/games', function(data) {
      $scope.game = data;
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
}]);
