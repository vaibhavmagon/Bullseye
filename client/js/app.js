'use strict';
var milestonesApp = angular.module('milestonesApp', ['dndLists','ngResource','lbServices','ngRoute','ui.bootstrap','ngDragDrop','xeditable']);

milestonesApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider
        .when("/", {redirectTo: "/dashBoard"})
        .when("/dashBoard", {templateUrl: "dashboard/partials/dashboard.html", controller: "DashBoardCtrl"})
        .when("/login", {templateUrl: "login/partials/login.html", controller: "LoginCtrl"})
        .otherwise('/');
}]);


