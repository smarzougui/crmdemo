// Login controller
'use strict';

var $scope;
var $firebaseAuth;


angular.module('crmDemo.addUser').controller('AddUserController', AddUserController);
AddUserController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$firebaseArray', '$location'];

function AddUserController($scope, firebaseAuth, auth, store, $firebaseArray, $location) {

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;
    $scope.success = false;

    $scope.user = {};

    // Grab the token
    var firebaseToken = store.get('firebaseToken');
    console.log("firebaseToken=", firebaseToken);

    $scope.connectAndAddUser = function(event) {

        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;

        var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");

        firebaseObj.createUser({
            email: username,
            password: password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $scope.success = true;
            }
        });

    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }
}

