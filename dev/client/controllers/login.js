milestonesApp.controller("LoginCtrl", function($rootScope, $scope, $http, $location) {

    var authenticate = function (credentials, callback) {
        $http.get('http://loaclhost:3000/validateUser/'+credentials.username+'/'+credentials.password).success(function (data) {
            if(data.message == "Success") {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }).error(function () {
            $rootScope.authenticated = false;
            callback && callback();
        });
    };

    $scope.credentials = {username:"",password:""};
    $scope.login = function () {
        authenticate($scope.credentials, function () {
            if ($rootScope.authenticated == true) {
                $location.path("/dashBoard");
                $scope.error = false;
            } else {
                /*$location.path("/login");*/
                $location.path("/dashBoard");
                $scope.error = true;
            }
        });
    };

    $scope.logout = function () {
        $rootScope.authenticated = false;
        $location.path("/login");
        $scope.error = false;
    };
});
