'use strict';
var milestonesApp = angular.module('milestonesApp', ['ngResource','lbServices','ngRoute','ui.bootstrap','ngDragDrop','xeditable','ipCookie']);

milestonesApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider
        .when("/", {redirectTo: "/dashboard"})
        .when("/dashBoard", {templateUrl: "dashboard/partials/dashboard.html", controller: "DashBoardCtrl"})
        .when("/login", {templateUrl: "login/partials/login.html", controller: "LoginCtrl"})
        .otherwise('/');
}]);


milestonesApp.run(function($rootScope,ipCookie){
  if(ipCookie('bullseyeCookie')){
    $rootScope.authenticated = true;
    var data = localStorage.getItem("lastLogin");
    $rootScope.currentUser = JSON.parse(data);
  }else{
    $rootScope.authenticated = false;
  }
});
