angular.module('angularIndividualGame', [])
.controller('individualgameController', ['$rootScope', '$scope', 'angularIndividualGame', function($rootScope, $scope, angularIndividualGame) {
  $scope.getUserGames = function () {
    angularIndividualGame.get(function(data) {
      console.log(data);
    });
  };
  $scope.getUserGames();
}])


.factory('angularIndividualGame', ['$http', function($http) {
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
