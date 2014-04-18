
angular.module('angularApp', ['angularAppRoutes', 'angularLogin', 'angularSignup', 'angularListAGame', 'angularLogout', 'angularSeeGame','angularMyGames', 'angularFindGames', 'angularNavbar', 'angularUserProfile'])

  .run(function($rootScope, $location, $state, getCurrentUser, getAllUsers) {

    //checks user on initial pageload to see if session is established, sets to public if not.
    $rootScope.checkUser = function() {
        getCurrentUser.get(function(user) {
          $rootScope.currentUser = user || 'public';
          if ($rootScope.currentUser !== 'public') {
            $rootScope.showLogin = false;
            return $rootScope.currentUser;
          } else {
            //checks route on refresh
            var restricted = ['/listAGame', '/myGames', '/userProfile'];
            if (_.contains(restricted, $location.$$path)) {
              $state.go('login');
            }
          }
        });
      };

    //apr12 added 
    $rootScope.joinGameList = undefined;


    //apr16 added
    $rootScope.getUsers = function(){
      getAllUsers.get(function(users){
        $rootScope.allUsers = users;
        console.log('$rootScope.allUser', $rootScope.allUsers);
      });
    };


    $rootScope.getUsers();

    $rootScope.checkUser();
    //checks if requested route is restricted on route change event, redirects to login if it is and user not logged in.
    $rootScope.$on('$stateChangeStart', function(e, goTo) {
      var restricted = ['listAGame', 'myGames', 'seeGame', 'userProfile'];
      if (_.contains(restricted, goTo.name) && $rootScope.currentUser === 'public') {
        $rootScope.redirectToState = goTo.name;
        e.preventDefault();
        $state.go('login');
      }
    });
  })

  .factory('getCurrentUser', ['$http', function($http) {
    return  {
      get: function(cb) {
        var getUser = $http.get('/user/current');
        getUser.success(function(data) {
          cb(data);
        });
        getUser.error(function(error) {
          console.log(error);
        });
      }
    };
  }])
  //apr16 added
  .factory('getAllUsers', ['$http', function($http){
    return{
      get: function(cb) {
        var getUser = $http.get('/users');
        getUser.success(function(data) {
          cb(data);
        });
        getUser.error(function(error) {
          console.log(error);
        });
      }
  //
    };
  }]);
