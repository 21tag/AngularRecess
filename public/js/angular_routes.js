angular.module('angularAppRoutes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('/', {
        url: '/findGames',
        templateUrl: 'angular_views/findGames.html',
        controller: 'findGamesController'
      })
      .state('findGames', {
        url: '/findGames',
        templateUrl: 'angular_views/findGames.html',
        controller: 'findGamesController'
      })
      .state('listAGame', {
        url: '/listAGame',
        templateUrl: 'angular_views/listAGame.html',
        controller: 'listAGameController'
      })
      .state('myGames', {
        url: '/myGames',
        templateUrl: 'angular_views/myGames.html',
        controller: 'myGamesController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'angular_views/login.html',
        controller: 'loginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'angular_views/signup.html',
        controller: 'signupController'
      })

      .state('logout', {
        url: '/logout',
        templateUrl: 'angular_views/logout.html',
        controller: 'logoutController'
      })

      .state('seeGame', {
        url: '/seeGame',
        templateUrl: 'angular_views/seeGame.html',
        controller: 'seeGameController'
      })

      .state('userProfile', {
        url: '/userProfile',
        templateUrl: 'angular_views/userProfile.html',
        controller: 'userProfileController'
      })
      ;

      $urlRouterProvider.otherwise('/findGames.html');

  }]);
