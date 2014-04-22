angular.module('angularFindGames', [])
.controller('findGamesController', ['$scope', '$rootScope', '$location', 'angularGames', function($scope, $rootScope, $location, angularGames) {
  
  $scope.map = {
    center: {
      latitude: 37.7836083,
      longitude: -122.40927020000001
    },
    zoom: 13
  };

  $scope.map.marker = {
    latitude: $scope.map.center.latitude,
    longitude: $scope.map.center.longitude
  }

  $scope.mapUser = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.marker.latitude = position.coords.latitude;
      $scope.marker.longitude = position.coords.longitude;
    });
  };

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
