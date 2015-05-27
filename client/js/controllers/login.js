milestonesApp.controller("LoginCtrl", ['$rootScope','$scope', '$routeParams', 'TrelloUser','List', 'Post', '$location','$http','$parse','ipCookie',
  function($rootScope,$scope,$routeParams,TrelloUser,List,Post,$location,$http,$parse,ipCookie) {

    $scope.authenticate = function (credentials, callback) {
        $http.get('http://localhost:3000/api/trelloUsers/loginUser/'+credentials.email+'/'+credentials.password).success(function (data) {
            if(data.length > 0) {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data[0];
                var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                ipCookie('bullseyeCookie',rString);
                localStorage.setItem('lastLogin', JSON.stringify(data[0]));
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
      $rootScope.currentUser = {};
      ipCookie.remove('bullseyeCookie');
      localStorage.removeItem('lastLogin');
      $location.path("/login");
    };

    /***************** Generic Function ***************/

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

}]);
