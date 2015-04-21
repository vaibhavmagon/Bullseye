milestonesApp.controller("LoginCtrl", ['$rootScope','$scope', '$routeParams', 'TrelloUser','List', 'Post', '$location','$http','$parse',
  function($rootScope,$scope,$routeParams,TrelloUser,List,Post,$location,$http,$parse) {

    $scope.authenticate = function (credentials, callback) {
        var obj = {email:credentials.email,password:credentials.password};
        $http.get('http://localhost:3000/api/trelloUsers/loginUser/'+credentials.email+'/'+credentials.password).success(function (data) {
            if(data.length > 0) {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data[0];
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }).error(function () {
            $rootScope.authenticated = false;
            callback && callback();
        });
    };

    $scope.credentials = {email:"",password:""};
    $scope.login = function () {
        $scope.authenticate($scope.credentials, function () {
            if ($rootScope.authenticated == true) {
                $location.path("/dashBoard");
                $scope.error = false;
            } else {
                $location.path("/login");
                $scope.error = true;
            }
        });
    };

    $scope.logout = function () {
        $rootScope.authenticated = false;
        $location.path("/login");
        $scope.error = false;
    };
}]);
