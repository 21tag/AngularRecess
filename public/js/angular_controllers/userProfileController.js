angular.module('angularUserProfile', [])
  .controller('userProfileController', ['$scope', '$state' , 'angularPutUser', function($scope, $state, angularPutUser) {
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
      $scope.updateUser($scope.user);
    };

    $scope.updateUser = function(user) {
      angularPutUser.put('/users', user, function(response) {
        $scope.response = response;
      });
    };
  }])

  .factory('angularPutUser', ['$http', function($http){
    return{
      put: function(url, userData, cb) {
        var putData = $http.put(url, userData);
        putData.success(function() {
          cb('Account Updated');
        });
        putData.error(function(error) {
          error = error || 'Account Could Not Be Updated';
          cb(error);
        });
      }
    };
  }]);
