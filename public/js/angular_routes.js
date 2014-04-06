angular.module('angularAppRoutes', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  //splash page

  // .state('navBar',{
  //   url: '/nav/:navId',
  //   template: '<div><h1>Navigation Bar</h1></div>\
  //           <a ui-sref="navBar.menu">Menu</a>\
  //           <div ui-view></div>\
  //           </div>',
  //   controller: function($scope, $stateParams) {
  //     $scope.navId = $stateParams.navId
  //   }
  // })

  .state('/', {
    url: 'index.html',
    templateUrl: 'index.html'
  })
  .state('seeAvailableGames', {
    url: '/availableGames',
    templateUrl: 'angular_views/availableGames.html'
  })
  .state('startNewGames', {
    url: '/startNewGames',
    templateUrl: 'angular_views/startNewGames.html'
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
