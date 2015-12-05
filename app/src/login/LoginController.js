// Login controller
'use strict';

var $scope;
var $firebaseSimpleLogin;

function LoginController(scope, firebaseSimpleLogin, auth, store) {
    $scope = scope;
    $firebaseSimpleLogin = firebaseSimpleLogin;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};


    var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");
    var loginObj = $firebaseSimpleLogin(firebaseObj);

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
        });;


        //FireBase
        /*            loginObj.$login('password', {
         email: username,
         password: password
         })
         .then(function(user) {
         // Success callback
         console.log('Authentication successful');
         }, function(error) {
         // Failure callback
         console.log('Authentication failure');
         });*/


    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }

}

angular.module('crmDemo.login').controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$firebaseSimpleLogin', 'auth', 'store'];
