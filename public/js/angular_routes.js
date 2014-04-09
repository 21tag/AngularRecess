angular.module('angularAppRoutes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('/', {
        url: 'index.html',
        templateUrl: 'index.html'
      })
      .state('findGames', {
        url: '/findGames',
        templateUrl: 'angular_views/findGames.html'
      })
      .state('listAGame', {
        url: '/listAGame',
        templateUrl: 'angular_views/listAGame.html',
        controller: 'listAGameController'
      })
      .state('myGames', {
        url: '/myGames',
        templateUrl: 'angular_views/myGames.html'
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
      });

      $urlRouterProvider.otherwise('/angular_index.html');

  }]);



