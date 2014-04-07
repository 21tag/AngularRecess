
angular.module('angularSignup', [])
.controller('signupController', ['$scope', 'angularSignup', function($scope, angularSignup) {
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

    console.log($scope.user);
    $scope.sendSignup($scope.user);
  };

  $scope.sendSignup = function(user) {
    angularSignup.post('/users', user, function(response) {
      console.log(response);
      $scope.response = response;
    });
  };
}])

.factory('angularSignup', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function() {
        cb('Account Created!');
      });
      postData.error(function(error) {
        error = error || 'Account Could Not Be Created';
        cb(error);
      });
    }
  };
}]);



// musicApp.factory('getData', ['$http', function($http) {
//   return{
//     get: function(url, cb) {
//       var results = $http.get(url);
//         results.success(function(data){cb(data)});
//     }
//   };



//in other files, create form view, send users there when click login (in navbar) for now. require this controller in app module.
//define module
//define controller
//trigger submit with a button, on click, call below method:
//define method loginUser to get data from form and put it in an object
//define method login to send that object using $http
//post to '/login'
//on success redirect to page, on err show err message.

//old  version does by getting form input and value,
//putting in an object {form.name: form.value},
//passing that to model.login function,
//along with a callback that only functions to display error.
//login function posts user login object to '/login',
//triggers redirect to page on success,
//calls cb with error message string on err.
