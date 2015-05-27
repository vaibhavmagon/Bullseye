milestonesApp.controller("NavBarCtrl",['$scope', '$rootScope','$http','$location','ipCookie',function($rootScope,$scope, $http,$location,ipCookie) {

  $scope.logout = function () {
    $rootScope.authenticated = false;
    $rootScope.currentUser = {};
    ipCookie.remove('bullseyeCookie');
    localStorage.removeItem('lastLogin');
    $location.path("/login");
  };
}]);

