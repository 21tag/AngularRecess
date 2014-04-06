
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
    angularLogin.post('/login', user, function(data) {
      console.log('posted');
    });
  };
}])

.factory('angularLogin', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function(data) {
        cb(data);
      });
      postData.error(function(error) {
        console.log(error);
      });
    }
  };
}]);



      //   error: function(model, response, options) {
      //     that.displayErrors('alert-error', response.responseText) ;
      //   },
      //   success: function(model, response, options) {
      //     that.displayErrors('alert-success', 'SUCCESS! Account created!');
      //     that.$('.input-field').val('');
      //   }
      // });

  // displayErrors: function(className, html) {
  //   var $form = this.$('form');
  //   $form.find('.alert').remove();
  //   $form.prepend('\
  //     <div class="alert ' + className + '" id="alert">' +
  //       '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
  //         html +
  //     '</div>'
  //   );
  // },
