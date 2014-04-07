angular.module('angularAppRoutes', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('/', {
    url: 'index.html',
    templateUrl: 'index.html'
  })
  .state('seeAvailableGames', {
    url: '/availableGames',
    templateUrl: 'angular_views/availableGames.html'
  })
  .state('game', {
    url: '/game',
    templateUrl: 'angular_views/game.html'
  })
  .state('manageGames', {
    url: '/manageGames',
    templateUrl: 'angular_views/manageGames.html'
  })
  .state('home', {
    url: '/',
    template: '<h1>home</h1>'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'angular_views/login.html'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'angular_views/signup.html'
  })

  ;
  $urlRouterProvider.otherwise('/angular_index.html');
}]);
