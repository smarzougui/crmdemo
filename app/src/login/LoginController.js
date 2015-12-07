// Login controller
'use strict';

var $scope;
var $firebaseAuth;


angular.module('crmDemo.login').controller('LoginController', LoginController);
LoginController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$firebaseArray', '$location', 'CONFIG'];

function LoginController($scope, firebaseAuth, auth, store, $firebaseArray, $location, CONFIG) {

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};

    // Grab the token
    var firebaseToken = store.get('firebaseToken');
    console.log("firebaseToken=", firebaseToken);

    $scope.SignIn = function(event) {
        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;

        //Auth0
        auth.signin({
            authParams: {
                // This asks for the refresh token
                // So that the user never has to log in again
                scope: 'openid offline_access',
                // This is the device name
                device: 'Mobile device'
            },
            // Make the widget non closeable
            standalone: true
        }, function(profile, token, accessToken, state, refreshToken) {
            // Login was successful
            // keep the user logged in by saving the token and profile
            store.set('profile', profile);
            store.set('token', token);
            store.set('refreshToken', refreshToken);
            auth.getToken({
                api: 'firebase'
            }).then(function(delegation) {
                console.log("delegation=", delegation);
                store.set('firebaseToken', delegation.id_token);
            }, function(error) {
                console.log("There was an error getting the firebase token", error);
            })
        }, function(error) {
            console.log("There was an error logging in", error);
        });
        ;

    }

    $scope.SignInLoginPassword = function(event) {
        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;

        var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");

        firebaseObj.authWithPassword({
            email: username,
            password: password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $scope.$apply(function() {
                    $location.path("/home");
                });
            }
        }, {
            remember: "sessionOnly"
        });

    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        store.remove('firebaseToken');
    }

}

