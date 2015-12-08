// Login Module
angular.module('crmDemo.addJob', ['ngRoute'])
// Declared route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-job', {
            templateUrl: 'src/jobs/add-job.html',
            controller: 'AddJobController'
        });
    }]);