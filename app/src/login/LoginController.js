// Login controller
    'use strict';

    var $scope;
    var $firebaseSimpleLogin;

    function LoginController (scope, firebaseSimpleLogin) {
        $scope = scope;
        $firebaseSimpleLogin = firebaseSimpleLogin;

        $scope.user = {};

        var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(firebaseObj);


        $scope.SignIn = function(event) {
            event.preventDefault();  // To prevent form refresh
            var username = $scope.user.email;
            var password = $scope.user.password;

            loginObj.$login('password', {
                email: username,
                password: password
            })
                .then(function(user) {
                    // Success callback
                    console.log('Authentication successful');
                }, function(error) {
                    // Failure callback
                    console.log('Authentication failure');
                });
        }

        console.log (loginObj);

    }

    angular.module('crmDemo.login').controller('LoginController', LoginController );

    LoginController.$inject = ['$scope', '$firebaseSimpleLogin'];
