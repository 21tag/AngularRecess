
angular.module('angularAuth', [])
.controller('authController', ['$scope', 'angularLogin', function($scope, angularLogin) {
  $scope.user = {
    email: 'undefined',
    password: 'undefined'
  };

  $scope.submitTheForm = function(username, password) {
    $scope.user.email = username;
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
