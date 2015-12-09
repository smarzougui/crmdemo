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
    'userInitDataService',
    '$compile'];
function HomeRecruiterController($scope,
                                 firebaseAuth,
                                 auth,
                                 store,
                                 $firebaseArray,
                                 $firebaseObject,
                                 CONFIG,
                                 userInitDataService,
                                 $compile) {
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
    $scope.aff.job = false;
    $scope.aff.managers = false;
    $scope.aff.candidates = false;
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
    syncObject.$bindTo($scope, 'jobs').then(function (data) {
        //sync.
        console.log("$scope.jobs=", $scope.jobs);
        var cleanArray = _.map($scope.jobs, function (el, key) {
            if (!!el && el != "jobs") {
                el.key = key;
            }
            return el;
        });
        $scope.jobsView = _.filter(cleanArray, function (el) {
            if (!angular.isObject(el)) {
                return false;
            } else {
                return el.managers ? false : true;
            }
            //return only the non affected job (manages or candidates not yet set)
        });
        //Affectation
        $scope.jobsAffectations = _.filter(cleanArray, function (el) {
            if (!angular.isObject(el)) {
                return false;
            } else {
                return !el.managers ? false : true;
            }
            //return only the non affected job (manages or candidates not yet set)
        });
        console.log("$scope.jobsAffectations=", $scope.jobsAffectations);
    });
    //Managers
    var syncObjectUsers = $firebaseObject(friendsRefUsers);
    syncObjectUsers.$bindTo($scope, 'users').then(function (data) {
        $scope.managers = _.filter($scope.users, function (el) {
            return el !== null ? (!!el.type ? (el.type == "manager") : false) : false;
        });
        $scope.candidates = _.filter($scope.users, function (el) {
            return el !== null ? (!!el.type ? (el.type == "candidate") : false) : false;
        });
    });
    $scope.createAffectation = function () {

        //inserting the affectation
        var firebaseObj = new Firebase(CONFIG.FIREBASE + '/jobs/' + $scope.aff.job);
        var refManagers = firebaseObj.child("managers");
        refManagers.set($scope.aff.managers);
        var refCand = firebaseObj.child("candidates");
        refCand.set($scope.aff.candidates);
        //Adding to the table:
        var jobName = _.find($scope.jobsView, function (el) {
            return el.key == $scope.aff.job;
        }).name;
        var html = '<tr><td>1</td><td>' + jobName + '</td>' +
            '<td>' + $scope.aff.managers.join() + '</td>' +
            '<td>' + $scope.aff.candidates.join() + '</td>' +
            '<td><button ng-click="deleteAffectation(' + $scope.aff.job + ','+ $scope.jobsAffectations.length +')" type="button" class="btn btn-danger">X</button></td>' +
            '</tr>';
        var temp = $compile(html)($scope);
        $('#affTable').append(temp);
    };
    $scope.deleteAffectation = function (key, idx) {
        //Not yet very stable... work on stablilyzing the Syncronization..
        //Deleting affecation
        $(".alert").show();
        var firebaseObj = new Firebase(CONFIG.FIREBASE + '/jobs/' + key);
        var refManagers = firebaseObj.child("managers");
        var refCand = firebaseObj.child("candidates");
        refManagers.set(null, function (error) {
            if (error) {
                console.log("Error deleting Managers", error);
            } else {
                refCand.set(null, function (error) {
                    if (error) {
                        console.log("Error deleting Candidates", error);
                    } else {
                        console.log("-->Success deleted");

                        idx++;
                        $('#affTable tr:nth-child(' + idx + ')').remove();
                    }
                });
            }
        });
    };
    $scope.logout = function () {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    };
    //Effects
    //Automatic close messages
    $(".alert").delay(4000).slideUp(200, function () {
        $(this).alert('close');
    });
}

