angular.module('angularSeeGame', [])
  .controller('seeGameController', ['$rootScope', '$scope', 'angularGetGame', function($rootScope, $scope, angularGetGame) {
    $scope.getUserGames = function () {
      angularGetGame.get(function(data) {
        console.log(data);
      });
    };
    $scope.getUserGames();
  }])


  .factory('angularGetGame', ['$http', function($http) {
    return {
      get: function(cb) {
        var getGames = $http.get('/games', cb);
        getGames.success(function(data) {
          cb(data);
        });
        getGames.error(function() {
          cb('Something went wrong, please try again');
        });
      }
    };
  }]);
