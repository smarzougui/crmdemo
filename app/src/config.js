/**
 * Created by smu on 04/12/2015.
 */

'use strict';

var app = angular
    .module('crmDemo', [
        'ngMaterial',
        'users',
        'ngRoute'
    ])
    .config(function($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');

    });

// Declared route

// Declared route
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'src/home/home.html',
        })
        .otherwise({
        redirectTo: '/login'
    });

}])