// Home controller

var $scope;
var $firebaseAuth;

angular.module('crmDemo.home-candidate').controller('HomeCandidateController', HomeCandidateController);
HomeCandidateController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$firebaseObject',
    'CONFIG',
    'userInitDataService'];

function HomeCandidateController($scope,
                        firebaseAuth,
                        auth,
                        store,
                        $firebaseArray,
                        $firebaseObject,
                        CONFIG,
                        userInitDataService) {

    var self = this,
        userID,
        firebaseObjRoot,
        friendsRefUser,
        friendsRefDays,
        friendsRefUserType;

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};
    $scope.userType = {};

    $scope.type = store.get('profile').type;

    userID = store.get('profile').email.replace(/\./g, ',');   //The email as stored in FireBase.
    $scope.email = store.get('profile').email;

    firebaseObjRoot = new Firebase(CONFIG.FIREBASE);
    friendsRefUser = new Firebase(CONFIG.FIREBASE + '/users/' + userID);
    friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');

    friendsRefUser.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
        if (error) {
            console.log("Authentication Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", auth);
        }
    });

    friendsRefUser.once("value", function(snapshot) {
        if (!snapshot.exists()) {       //New user, init the user Data
            var usersRef = firebaseObjRoot.child("users/" + store.get('profile').email.replace(/\./g, ','));
            usersRef.set({
                days: userInitDataService,
                manager: 'null'
            });
        } else {

        }
    });

    //Binding DATA
    var syncObject = $firebaseObject(friendsRefDays);
    // three way data binding
    syncObject.$bindTo($scope, 'days');
    $scope.reset = function() {
        var fb = $firebaseArray(friendsRefDays);
        friendsRefDays.set(userInitDataService, function(err) {
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

