milestonesApp.controller("LoginCtrl", ['$rootScope','$scope', '$routeParams', 'User','List', 'Post', '$location','$http','$parse',
  function($rootScope,$scope,$routeParams,User,List,Post,$location,$http,$parse) {

    $scope.authenticate = function (credentials, callback) {
        var obj = {email:credentials.email,password:credentials.password};
        User.login(obj,function(err,user){
          if(err){
            $rootScope.authenticated = false;
            callback && callback();
          }
          console.log("***********",user);
          $rootScope.authenticated = true;
          $rootScope.currentUser = user;
        });
        /*$http.get('http://loaclhost:3000/loginUser/'+credentials.email+'/'+credentials.password).success(function (data) {
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
        });*/
    };

    $scope.credentials = {email:"",password:""};
    $scope.login = function () {
        $scope.authenticate($scope.credentials, function () {
            if ($rootScope.authenticated == true) {
                $location.path("/dashBoard");
                $scope.error = false;
            } else {
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
}]);
