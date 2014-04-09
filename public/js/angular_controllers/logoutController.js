angular.module('angularLogout', [])
  .controller('logoutController', ['$rootScope', '$scope', 'angularGetLogout', function($rootScope, $scope, angularGetLogout) {
    $scope.response = 'Not logged in';
    $scope.logout = function(user) {
      if ($rootScope.currentUser !== 'public') {
        angularGetLogout.get(user, function(response) {
          $scope.response = response;
          $rootScope.currentUser = 'public';
        });
      }
    };
    $scope.logout($rootScope.currentUser);
  }])


  .factory('angularGetLogout', ['$http', function($http) {
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
