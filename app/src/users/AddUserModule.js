// Login Module

angular.module('crmDemo.addUser', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add-user', {
            templateUrl: 'src/users/view/add-user.html',
            controller: 'AddUserController'
        });
    }]);