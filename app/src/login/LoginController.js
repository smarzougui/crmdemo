// Login controller
    'use strict';

    var $scope;
    var $firebaseSimpleLogin;

    function LoginController (scope, firebaseSimpleLogin) {
        $scope = scope;
        $firebaseSimpleLogin = firebaseSimpleLogin;

        var firebaseObj = new Firebase("https://luminous-fire-4441.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(firebaseObj);
        console.log (loginObj);

    }

    angular.module('crmDemo.login').controller('LoginController', LoginController );

    LoginController.$inject = ['$scope', '$firebaseSimpleLogin'];
