angular.module('angularMyGames', [])
  .controller('myGamesController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.getMyGames = function () {
    $rootScope.currentUser.upcomingGames.push('sample game');
    $scope.myGames = $rootScope.currentUser.upcomingGames;
      };
    $scope.getMyGames();
  }])


  // .factory('angularGetMyGames', ['$http', function($http) {
  //   return {
  //     get: function(cb) {
  //       var getGames = $http.get('/game', cb);
  //       getGames.success(function(data) {
  //         cb(data);
  //       });
  //       getGames.error(function() {
  //         cb('Something went wrong, please try again');
  //       });
  //     }
  //   };
  // }]);
