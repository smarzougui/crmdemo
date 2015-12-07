// Home Module

angular.module('crmDemo.home', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeController',
            requiresLogin: true
        });
    }])
