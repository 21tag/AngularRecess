
angular.module('angularApp', ['angularAppRoutes', 'angularLogin', 'angularSignup', 'angularListAGame', 'angularLogout', 'angularSeeGame','angularMyGames', 'angularFindGames', 'angularNavbar', 'angularUserProfile'])

  .run(function($rootScope, $location, $state, getCurrentUser) {

    //checks user on initial pageload to see if session is established, sets to public if not.
    $rootScope.checkUser = function() {
        getCurrentUser.get(function(user) {
          $rootScope.currentUser = user || 'public';
          if ($rootScope.currentUser !== 'public') {
            $rootScope.showLogin = false;
          }
        });
      };


    $rootScope.checkUser();
    //checks if requested route is restricted on route change event, redirects to login if it is and user not logged in.
    $rootScope.$on('$stateChangeStart', function(e, goTo, goToParams, from, fromParams) {
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
  }]);

