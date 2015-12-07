// Login controller
'use strict';

var $scope;
var $firebaseAuth;


angular.module('crmDemo.addUser').controller('AddUserController', AddUserController);
AddUserController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$location',
    'CONFIG',
    'userInitDataService'
];

function AddUserController($scope,
                           firebaseAuth,
                           auth, store,
                           $firebaseArray,
                           $location,
                           CONFIG,
                           userInitDataService) {

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;
    $scope.success = false;

    $scope.user = {};

    // Grab the token
    var firebaseToken = store.get('firebaseToken');

    $scope.connectAndAddUser = function(event) {

        event.preventDefault();  // To prevent form refresh
        var email = $scope.user.email;
        var password = $scope.user.password;
        var type = $scope.user.type;

        var firebaseObj = new Firebase(CONFIG.FIREBASE);

        firebaseObj.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:" + email, error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $scope.success = true;
                //Creating the user Data.



                var usersRef = firebaseObj.child("users/" + email.replace(/\./g, ','));
                usersRef.set({
                    days: userInitDataService,
                    manager: 'null',
                    type: type
                });


            }
        });

    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }
}

