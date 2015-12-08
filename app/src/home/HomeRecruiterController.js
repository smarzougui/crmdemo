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

    $scope.aff = {};
    $scope.aff.job = {};
    $scope.aff.managers = {};
    $scope.aff.candidates = {};

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

        //sync.
        $scope.jobsView = _.filter(_.map($scope.jobs, function(el, key) {
            if (!!el && el !="jobs") {
                el.key = key;
            }
            return el;
        }), function(el) {
            return !angular.isObject(el) ? false : true;
        })

    });

    //Managers
    var syncObjectUsers = $firebaseObject(friendsRefUsers);
    syncObjectUsers.$bindTo($scope, 'users').then(function(data) {
        $scope.managers = _.filter($scope.users, function(el) {
            return el !== null ? (!!el.type ? (el.type == "manager") : false) : false;
        });
        $scope.candidates = _.filter($scope.users, function(el) {
            return el !== null ? (!!el.type ? (el.type == "candidate") : false) : false;
        });
    });

    $scope.createAffectation = function() {

        //inserting the affectation
        var firebaseObj = new Firebase(CONFIG.FIREBASE + '/jobs/' + $scope.aff.job);
        var refManagers = firebaseObj.child("managers");
        refManagers.set($scope.aff.managers);

        var refCand = firebaseObj.child("candidates");
        refCand.set($scope.aff.candidates);

        //Adding to the table:
        var jobName = _.find($scope.jobsView, function(el) {
            return el.key == $scope.aff.job;
        }).name;

        $('#affTable').append('<tr><td>1</td><td>'+ jobName +'</td>' +
            '<td>'+ $scope.aff.managers.join() +'</td>' +
            '<td>'+ $scope.aff.candidates.join() +'</td></tr>');

    };

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    };
}

