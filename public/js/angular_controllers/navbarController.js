angular.module('angularNavbar', [])
  .controller('navbarController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
    $rootScope.showLogin = true;
    $scope.updateUser = function() {
      $state.go('userProfile');
    };
  }]);
