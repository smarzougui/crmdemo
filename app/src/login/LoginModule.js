// Login Module

angular.module('crmDemo.login', ['ngRoute', 'firebase'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginController'
        });
    }]);