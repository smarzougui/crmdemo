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


    friendsRefJobs.on("value", function(snapshot) {
        $scope.manJobs = _.filter(snapshot.val(), function(job) {
            return _.some(job.managers, function(manager) {
                return manager === $scope.email
            });
        });


        var j = {}, c = {};
        $scope.final = [];

        angular.forEach($scope.manJobs, function(job, index) {
            var j = job;

            angular.forEach(job.candidates, function(cand, index) {

                c = {'days' : 'blabla' };


                /*                // Get a database reference to our posts
                 var ref = new Firebase(CONFIG.FIREBASE + '/users/' + c.replace(/\./g, ',') + '/days');
                 ref.on("value", function(snapshot) {
                 console.log(snapshot.val());
                 }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
                 });
                 console.log("c=", c);*/

            })

        });

        console.log("$scope.manJobs=", $scope.manJobs);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    /*
     //Jobs

     var arr = [];

     angular.forEach($scope.manJobs, function(el) {
     angular.forEach(el.candidates, function (c) {


     // Get a database reference to our posts
     var ref = new Firebase(CONFIG.FIREBASE + '/users/' + c.replace(/\./g, ',') + '/days');
     ref.on("value", function(snapshot) {
     console.log(snapshot.val());
     }, function (errorObject) {
     console.log("The read failed: " + errorObject.code);
     });
     console.log("c=", c);

     })

     });

     console.log("$scope.manJobs=", $scope.manJobs);
     */


    /*

     //Binding DATA
     var userID = store.get('profile').email.replace(/\./g, ',');   //The email as stored in FireBase.
     friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');

     var syncObject = $firebaseObject(friendsRefDays);
     // three way data binding
     syncObject.$bindTo($scope, 'days');







     });
     */

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

