
angular.module('angularSignup', [])
.controller('signupController', ['$scope', '$state' , 'angularSignup', function($scope, $state, angularSignup) {
  $scope.user = {
    display_name: 'undefined',
    email: 'undefined',
    phone: 'undefined',
    password: 'undefined'
  };

  $scope.submitTheForm = function(fullname, email, phonenumber, password) {
    $scope.user.display_name = fullname;
    $scope.user.email = email;
    $scope.user.phone = phonenumber;
    $scope.user.password = password;
    $scope.sendSignup($scope.user);
  };

  $scope.sendSignup = function(user) {
    angularSignup.post('/users', user, function(response, redirect) {
      $scope.response = response;
      $state.go(redirect);
    });
  };
}])

.factory('angularSignup', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function() {
        cb('Account Created!', 'login');
      });
      postData.error(function(error) {
        error = error || 'Account Could Not Be Created';
        cb(error, 'signup');
      });
    }
  };
}]);


