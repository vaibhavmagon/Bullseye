milestonesApp.controller("NavBarCtrl",['$scope', '$rootScope','$http','$location',function($rootScope,$scope, $http,$location) {

    $scope.logout = function () {
        $rootScope.authenticated = false;
        $rootScope.currentUser = {};
        $location.path("/login");
    };
}]);

