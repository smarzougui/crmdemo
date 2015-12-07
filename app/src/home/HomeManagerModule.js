// Home Module

angular.module('crmDemo.home-manager', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home-manager', {
            templateUrl: 'src/home/home-manager.html',
            controller: 'HomeManagerController',
            requiresLogin: true
        });
    }])
