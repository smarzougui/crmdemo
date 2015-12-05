// Login controller
(function(){
    'use strict';

    var $scope;
    var $firebaseSimpleLogin;

    function LoginController() {
        //used later for binding
        this.init();
    }

    function LoginController (scope, firebaseSimpleLogin) {
        $scope = scope;
        $firebaseSimpleLogin = firebaseSimpleLogin;
    }

    LoginController.prototype.init = function () {
        //init here if needed
    };

    angular.module('crmDemo.login').contoller('LoginController', LoginController );

    LoginController.$inject = ['$scope', '$firebaseSimpleLogin'];

});