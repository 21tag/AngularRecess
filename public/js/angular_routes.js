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
    templateUrl: 'js/angular_views/availableGames.html'
  })
  .state('startNewGames', {
    url: '/startNewGames',
    templateUrl: 'js/angular_views/startNewGames.html'
  })
  .state('manageGames', {
    url: '/manageGames',
    templateUrl: 'js/angular_views/manageGames.html'
  })
  .state('home', {
    url: '/',
    template: '<h1>home</h1>'
  });
  $urlRouterProvider.otherwise('/angular_index.html');
}]);
