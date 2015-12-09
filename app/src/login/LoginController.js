// Login controller
'use strict';

var profileSaveObject = {};

angular.module('crmDemo.login').controller('LoginController', LoginController);
LoginController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$location', 'CONFIG'];

function LoginController($scope, firebaseAuth, auth, store, $location, CONFIG) {

    var self = this,
        userID,
        email,
        password,
        firebaseObjRoot,
        friendsRefUser,
        friendsRefDays,
        friendsRefUserType;

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
                scope: 'openid offline_access',  // This asks for the refresh token // So that the user never has to log in again
                device: 'Mobile device' // This is the device name
            },
            standalone: true // Make the widget non closeable
        }, function(profile, token, accessToken, state, refreshToken) {
            // Login was successful, keep the user logged in by saving the token and profile
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
    }

    $scope.SignInLoginPassword = function(event) {
        event.preventDefault();  // To prevent form refresh

        userID = $scope.user.email.replace(/\./g, ',');

        firebaseObjRoot = new Firebase(CONFIG.FIREBASE);
        friendsRefUser = new Firebase(CONFIG.FIREBASE + '/users/' + userID);
        friendsRefUserType = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/type');
        friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');

        firebaseObjRoot.authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                store.set('token', authData.token);
                profileSaveObject.email = authData.password.email;
                friendsRefUserType.on("value", function(snapshot) {
                    profileSaveObject.type = snapshot.val();
                    store.set('profile', profileSaveObject);
                    console.log("profileSaveObject.type=", profileSaveObject.type);

                    switch (profileSaveObject.type) {
                        case "manager":
                            $scope.$apply(function() {
                                $location.path("/home-manager");
                            });
                            break;
                        case "recruiter":
                            $scope.$apply(function() {
                                $location.path("/home-recruiter");
                            });
                            break;
                        case "candidate":
                            $scope.$apply(function() {
                                $location.path("/home-candidate");
                            });
                            break;
                        default:
                            break;
                    }

                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
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

    //Effects
    //Automatic close messages
    $(".alert").delay(4000).slideUp(200, function() {
        $(this).alert('close');
    });

}