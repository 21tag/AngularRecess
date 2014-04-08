angular.module('angularLogout', [])
.controller('logoutController', ['$rootScope', '$scope', 'angularLogout', function($rootScope, $scope, angularLogout) {
  $scope.logout = function(user) {
    angularLogout.get(user, function(response) {
      $scope.response = response;
      $rootScope.currentUser = '';
    });
  };
  $scope.logout($rootScope.currentUser);
}])


.factory('angularLogout', ['$http', function($http) {
  return {
    get: function(user, cb) {
      var logout = $http.get('/logout', user, cb);
      logout.success(function() {
        cb('You are now logged out');
      });
      logout.error(function() {
        cb('Something went wrong, please try again');
      });
    }
  };
}]);
