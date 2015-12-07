// Home Module

angular.module('crmDemo.home-candidate', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home-candidate', {
            templateUrl: 'src/home/home-candidate.html',
            controller: 'HomeCandidateController',
            requiresLogin: true
        });
    }])
