angular.module('angularNavbar', [])
  .controller('navbarController', ['$rootScope', '$scope', function($rootScope, $scope) {
      $rootScope.showLogin = true;
    }]);
