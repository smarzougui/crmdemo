/**
 * Created by smu on 04/12/2015.
 */

'use strict';

var app = angular
    .module('crmDemo', [
        'crmDemo.login',
        'crmDemo.home',
        'ngMaterial',
        'users',
        'ngRoute',
        'auth0'
    ])
    .config(function($mdThemingProvider, $mdIconProvider, authProvider) {
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

        authProvider.init({
            domain: 'crm-demo.eu.auth0.com',
            clientID: 'p5oqu1xc4U7A8k3vimWiV7tAplNLN6Zz',
            loginUrl: '/login'
        });

    }).run(function(auth) {
        auth.hookEvents();
    });

// Declared route

// Declared route
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.otherwise({
        redirectTo: '/login'
    });

}])