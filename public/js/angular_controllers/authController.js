
angular.module('angularAuth', [])
.controller('authController', ['$rootScope', '$scope', '$state', 'angularLogin', function($rootScope, $scope, $state, angularLogin) {
  $scope.user = {
    email: 'undefined',
    password: 'undefined'
  };

  $scope.submitTheForm = function(email, password) {
    $scope.user.email = email;
    $scope.user.password = password;
    $scope.sendLogin($scope.user);
  };

  $scope.sendLogin = function(user) {
    angularLogin.post('/login', user, function(response, redirect, data) {
      if (data) {
        $rootScope.currentUser = data;
      }
      $scope.response = response;
      $state.go(redirect);
    });
  };
}])

.factory('angularLogin', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function(data) {
        cb('Login Successful!', 'home', data);
      });
      postData.error(function(error) {
        error = error || 'Login Unsuccessful';
        cb(error, 'login');
      });
    }
  };
}]);
