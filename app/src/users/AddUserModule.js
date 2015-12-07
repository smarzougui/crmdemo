// Login Module

angular.module('crmDemo.addUser', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add-user', {
            templateUrl: 'src/users/add-user.html',
            controller: 'AddUserController'
        });
    }]);