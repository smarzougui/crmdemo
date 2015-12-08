// Home controller

var $scope;
var $firebaseAuth;

angular.module('crmDemo.home-manager').controller('HomeManagerController', HomeManagerController);
HomeManagerController.$inject = [
    '$scope',
    '$firebaseAuth',
    'auth',
    'store',
    '$firebaseArray',
    '$firebaseObject',
    'CONFIG',
    'userInitDataService'];

function HomeManagerController($scope,
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

    var j = {}, days = {};
    $scope.user = {};
    $scope.userType = {};
    var fbManJobs = {};
    var final = [];
    var interationCand = [];

    $scope.type = store.get('profile').type;

    userID = store.get('profile').email.replace(/\./g, ',');   //The email as stored in FireBase.
    $scope.email = store.get('profile').email;

    firebaseObjRoot = new Firebase(CONFIG.FIREBASE);
    friendsRefUser = new Firebase(CONFIG.FIREBASE + '/users/' + userID);
    friendsRefUsers = new Firebase(CONFIG.FIREBASE + '/users');
    friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');
    friendsRefJobs = new Firebase(CONFIG.FIREBASE + '/jobs');

    friendsRefJobs.on("value", function(snapshot) {
        fbManJobs = _.filter(snapshot.val(), function(job) {
            return _.some(job.managers, function(manager) {
                return manager === $scope.email
            });
        });

        console.log("Start fbManJobs=", fbManJobs);

        angular.forEach(fbManJobs, function(job, indexJ) {
            j = job;
            angular.forEach(job.candidates, function(cand, indexC) {
                var ref = new Firebase(CONFIG.FIREBASE + '/users/' + cand.replace(/\./g, ',') + '/days');
                ref.orderByKey().on("value", function(snapshot) {
                    days = snapshot.val();
                    interationCand.push({
                        email: cand,
                        days: days
                    });
                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            })

            j.candidates = interationCand;
            final.push(j);

        });

        console.log("fbManJobs=", fbManJobs);


        $scope.manJobs = fbManJobs;
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
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

