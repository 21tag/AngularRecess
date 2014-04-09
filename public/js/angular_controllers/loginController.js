
angular.module('angularLogin', [])
  .controller('loginController', ['$rootScope', '$scope', '$state', 'angularPostLogin', function($rootScope, $scope, $state, angularPostLogin) {
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
      angularPostLogin.post('/login', user, function(response, redirect, data) {
        if (data) {
          $rootScope.currentUser = data;
        }
        $scope.response = response;
        $state.go(redirect);
      });
    };
  }])

  .factory('angularPostLogin', ['$http', '$rootScope', function($http, $rootScope){
    return{
      post: function(url, userData, cb) {
        var postData = $http.post(url, userData);
        postData.success(function(data) {
          var redirect = $rootScope.redirectToState || 'myGames';
          cb('Login Successful!', redirect, data);
        });
        postData.error(function(error) {
          error = error || 'Login Unsuccessful';
          cb(error, 'login');
        });
      }
    };
  }]);
