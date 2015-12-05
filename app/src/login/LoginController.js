// Login controller
    'use strict';

    var $scope;
    var $firebaseSimpleLogin;

    function LoginController (scope, firebaseSimpleLogin, auth, store) {
        $scope = scope;
        $firebaseSimpleLogin = firebaseSimpleLogin;
        $scope.auth = auth;
        $scope.store= store;

        $scope.user = {};


        var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(firebaseObj);


        $scope.SignIn = function(event) {
            event.preventDefault();  // To prevent form refresh
            var username = $scope.user.email;
            var password = $scope.user.password;


            //Auth0
            auth.signin({
                authParams: {
                    scope: 'openid name email' // Specify the scopes you want to retrieve
                }
            }, function(profile, idToken, accessToken, state, refreshToken) {
                $location.path('/user-info')
            }, function(err) {
                console.log("Error :(", err);
            });



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

    angular.module('crmDemo.login').controller('LoginController', LoginController );

    LoginController.$inject = ['$scope', '$firebaseSimpleLogin', 'auth', 'store'];
