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


    //Jobs
    var syncObject = $firebaseObject(friendsRefJobs);
    syncObject.$bindTo($scope, 'jobs').then(function(data) {
        $scope.manJobs = [];
         angular.forEach($scope.jobs, function(el) {
             if (!!el && el.managers) {
                 if (_.contains (el.managers, "m2@gmail.com")) {
                     //candidates day
                     $scope.manJobs.push(el);
                 }
             }
        });



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



        /*

                //Binding DATA
                var userID = store.get('profile').email.replace(/\./g, ',');   //The email as stored in FireBase.
                friendsRefDays = new Firebase(CONFIG.FIREBASE + '/users/' + userID + '/days');

                var syncObject = $firebaseObject(friendsRefDays);
                // three way data binding
                syncObject.$bindTo($scope, 'days');



        */



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

