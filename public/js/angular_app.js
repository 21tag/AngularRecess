
angular.module('angularApp', ['angularAppRoutes', 'angularLogin', 'angularSignup', 'angularListAGame', 'angularLogout', 'angularSeeGame','angularMyGames', 'angularFindGames', 'angularNavbar', 'angularUserProfile'])

  .run(function($rootScope, $location, $state, getCurrentUser) {

  $rootScope.sports = [
    'Badminton',
    'Baseball',
    'Basketball',
    'Billiards',
    'Board Games',
    'Bocce',
    'Bowling',
    'Capture the Flag',
    'Cards',
    'Checkers',
    'Chess',
    'Climbing',
    'Cricket',
    'D&D',
    'Disc Golf',
    'Dodgeball',
    'Dominoes',
    'Flag Football',
    'Football',
    'Foursquare',
    'Go',
    'Golf',
    'Ice Hockey',
    'Kickball',
    'Lacrosse',
    'Martial Arts',
    'Quidditch',
    'Racquetball',
    'Rugby',
    'Shuffleboard',
    'Soccer',
    'Softball',
    'Speed-ball',
    'Squash',
    'Street Hockey',
    'Tag',
    'Tennis',
    'Tennis (doubles)',
    'Ultimate Frisbee',
    'Volleyball',
    'Water Polo',
    'Wiffleball',
    'Yoga',
    'Other',
  ];


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

    $rootScope.joinGameList = undefined;

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
  }]);
  
