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


    var friendsRef = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');
    var token = CONFIG.TEMP_TOKEN;
    friendsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
        console.log("-->authWithCustomToken");

        if (error) {
            console.log("Authentication Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", auth);
        }
    });

    var syncObject = $firebaseObject(friendsRef);
    // three way data binding
    syncObject.$bindTo($scope, 'days');


    $scope.reset = function() {

        var fb = $firebaseArray(friendsRef);

        friendsRef.set( userInitDataService , function (err) {
            if (!err) {
                console.log("Reset successful !");
            }
        });

    }
    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }
}

