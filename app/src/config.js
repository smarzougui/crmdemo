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
        'auth0',
        'angular-storage',
        'angular-jwt',
        'ngCookies'
    ])
    .config(function($mdThemingProvider, $mdIconProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
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


        /*
         *** Auth0
         */
        authProvider.init({
            domain: 'crm-demo.eu.auth0.com',
            clientID: 'p5oqu1xc4U7A8k3vimWiV7tAplNLN6Zz',
            //callbackURL: 'http://vm/freelance_demo_crm/app/#/home',
            loginUrl: '/login'
        });

        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log("Login Success");
            profilePromise.then(function(profile) {
                store.set('profile', profile);
                store.set('token', idToken);
                console.log("profile=", profile);
                console.log("idToken=", idToken);


            });
            $location.path('/');
        });

        authProvider.on('loginFailure', function() {
            alert("Error");
        });

        authProvider.on('authenticated', function($location) {
            console.log("Authenticated");

        });

        authProvider.on('logout', function() {
            console.log("Logged out");
        })


        // We're annotating this function so that the `store` is injected correctly when this file is minified
        jwtInterceptorProvider.tokenGetter = ['store', 'config', 'auth', function(store, config, auth) {

            var targetClientId = 'kfiboIt1lAeq0MSJkaeVXhdZTmgRff8iA5KAy3dv'; // FireBase Application
            if (config.url.indexOf('https://luminous-fire-4441.firebaseio.com') === 0) {
                return auth.getToken({
                    targetClientId: targetClientId
                }).then(function(delegation) {
                    return delegation.id_token;
                });
            } else {
                return store.get('token');
            }


        }];
        $httpProvider.interceptors.push('jwtInterceptor');


    }).run(function($location, $rootScope, auth, store, jwtHelper) {
        auth.hookEvents();


        //Keep User loggedIn after page refresh
        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    // Either show the login page or use the refresh token to get a new idToken
                    $location.path('/login');
                }
            }
        });


    });

// Declared route
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.otherwise({
        redirectTo: '/home'
    });

}])