
angular.module('angularAuth', [])
.controller('authController', ['$scope', 'angularLogin', function($scope, angularLogin) {
  $scope.user = {
    email: 'undefined',
    password: 'undefined'
  };

  $scope.submitTheForm = function(email, password) {
    $scope.user.email = email;
    $scope.user.password = password;
    console.log($scope.user);
    $scope.sendLogin($scope.user);
  };

  $scope.sendLogin = function(user) {
    angularLogin.post('/login', user, function(response) {
      $scope.response = response;
    });
  };
}])

.factory('angularLogin', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function() {
        cb('Login Successful!');
      });
      postData.error(function(error) {
        error = error || 'Login Unsuccessful';
        cb(error);
      });
    }
  };
}]);

