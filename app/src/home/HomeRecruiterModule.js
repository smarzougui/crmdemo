// Home Module

angular.module('crmDemo.home-recruiter', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home-recruiter', {
            templateUrl: 'src/home/home-recruiter.html',
            controller: 'HomeRecruiterController',
            requiresLogin: true
        });
    }])
