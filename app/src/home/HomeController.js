// Home controller

var $scope;
var $firebaseAuth;

angular.module('crmDemo.home').controller('HomeController', HomeController);
HomeController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$firebaseObject',
    'CONFIG',
    'userInitDataService'];

function HomeController($scope,
                        firebaseAuth,
                        auth,
                        store,
                        $firebaseArray,
                        $firebaseObject,
                        CONFIG,
                        userInitDataService) {

    var self = this;

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};


    var userID = store.get('profile').email.replace(/\./g, ',');   //The email as stored in FireBase.


    var firebaseObjRoot = new Firebase(CONFIG.FIREBASE);
    var friendsRefUser = new Firebase(CONFIG.FIREBASE + '/users/' + userID);
    var friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');

    friendsRefUser.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
        console.log("-->authWithCustomToken");

        if (error) {
            console.log("Authentication Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", auth);
        }
    });


    //Check if it is a new User ?

    //If new user, create the init data.


    var syncObject = $firebaseObject(friendsRefDays);
    // three way data binding
    syncObject.$bindTo($scope, 'days');
    $scope.reset = function() {
        var fb = $firebaseArray(friendsRefDays);
        friendsRefDays.set( userInitDataService , function (err) {
            if (!err) {
                console.log("Reset successful !");
            }
        });
    }





    friendsRefUser.once("value", function(snapshot) {

        if (!snapshot.exists()) {
            //New user, init the user Data

            var usersRef = firebaseObjRoot.child("users/" + store.get('profile').email.replace(/\./g, ','));
            usersRef.set({
                days: userInitDataService,
                manager: 'null'
            });

        } else {
            console.log("-->existing user, No problem, loading Data");

        }

    });






    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }
}

