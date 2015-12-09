// Login controller
'use strict';

var $scope;
var $firebaseAuth;


angular.module('crmDemo.addJob').controller('AddJobController', AddJobController);
AddJobController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$location',
    'CONFIG',
    'userInitDataService'
];

function AddJobController($scope,
                          firebaseAuth,
                          auth,
                          store,
                          $firebaseArray,
                          $location,
                          CONFIG,
                          userInitDataService) {

    if (!!!store.get('profile')) {         //Not connected
        $location.path('/login');
    }

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;
    $scope.success = false;
    $scope.type = store.get('profile').type;
    $scope.email = store.get('profile').email;

    $scope.job = {};

    // Grab the token
    var firebaseToken = store.get('firebaseToken');

    $scope.addJob = function(event) {

        event.preventDefault();  // To prevent form refresh

        var firebaseObj = new Firebase(CONFIG.FIREBASE);

        var usersRef = firebaseObj.child("jobs");
        usersRef.push($scope.job, function(error, userData) {
                if (error) {
                    console.log("Error creating job:" + job.name, error);
                } else {
                    console.log("Successfully created the job");
                    $scope.$apply(function() {
                        $scope.success = true;
                    });
                }
            }
        );

    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }

    //Effects
    //Automatic close messages
    $(".alert").delay(4000).slideUp(200, function() {
        $(this).alert('close');
    });

};
