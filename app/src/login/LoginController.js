// Login controller
'use strict';

var $scope;
var $firebaseAuth;


angular.module('crmDemo.login').controller('LoginController', LoginController);
LoginController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$firebaseArray', '$location'];

function LoginController($scope, firebaseAuth, auth, store, $firebaseArray, $location) {

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
            // We need to save the information from the login
            store.set('profile', profile);
            store.set('token', token);
            store.set('refreshToken', refreshToken);
            auth.getToken({
                api: 'firebase'
            }).then(function(delegation) {
                console.log("delegation=", delegation);
                store.set('firebaseToken', delegation.id_token);
                $state.go('app.categories');
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
    }

    $scope.testFBDelegation = function() {

        var friendsRef = new Firebase("https://luminous-fire-4441.firebaseio.com/days");
// Here we're using the Firebase Token we stored after login

        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NybS1kZW1vLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyIsImF1ZCI6InA1b3F1MXhjNFU3QThrM3ZpbVdpVjd0QXBsTkxONlp6IiwiZXhwIjoxNDQ5NjQ4MzY5LCJpYXQiOjE0NDk2MTIzNjksInYiOjAsImQiOnsiZmJfaWQiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyJ9LCJhenAiOiJwNW9xdTF4YzRVN0E4azN2aW1XaVY3dEFwbE5MTjZaeiJ9.p7SwcizSbWRfgOysnX-UP6EXCl70LxaS1E4BjQQgLW4";
        friendsRef.authWithCustomToken(token, function(error, auth) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", auth);
            }
        });

        var friends = $firebaseArray(friendsRef);
        friends.$add({name: 'Hey John'});


    }

}

