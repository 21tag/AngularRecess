
angular.module('angularAuth', [])
.controller('authController', ['$scope', '$state', 'angularLogin', function($scope, $state, angularLogin) {
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
    angularLogin.post('/login', user, function(response, redirect) {
      $scope.response = response;
      $state.go(redirect);
    });
  };
}])

.factory('angularLogin', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function() {
        cb('Login Successful!', 'home');
      });
      postData.error(function(error) {
        error = error || 'Login Unsuccessful';
        cb(error, 'login');
      });
    }
  };
}]);

