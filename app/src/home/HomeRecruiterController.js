// Home controller

var $scope;
var $firebaseAuth;

angular.module('crmDemo.home-recruiter').controller('HomeRecruiterController', HomeRecruiterController);
HomeRecruiterController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$firebaseObject',
    'CONFIG',
    'userInitDataService'];

function HomeRecruiterController($scope,
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
        friendsRefUserType,
        friendsRefJobs;

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
    friendsRefUsers = new Firebase(CONFIG.FIREBASE + '/users');
    friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');
    friendsRefJobs = new Firebase(CONFIG.FIREBASE + '/jobs');


    //Jobs
    var syncObject = $firebaseObject(friendsRefJobs);
    syncObject.$bindTo($scope, 'jobs').then(function(data) {
        console.log("$scope.jobs=", ($scope.jobs));
        console.log("$scope.jobs=", Object.keys($scope.jobs));


    });

    //Managers
    var syncObjectUsers = $firebaseObject(friendsRefUsers);
    syncObjectUsers.$bindTo($scope, 'users').then(function(data) {
        $scope.managers = _.filter($scope.users, function(el) {
            return el !== null ? (!!el.type ? (el.type == "manager") : false) : false;
        });


    });


    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }


}

