// Home controller

var $scope;
var $firebaseAuth;

angular.module('crmDemo.home').controller('HomeController', HomeController);
HomeController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$firebaseArray', '$firebaseObject'];

function HomeController($scope, firebaseAuth, auth, store, $firebaseArray, $firebaseObject) {

    var self = this;

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};


    var friendsRef = new Firebase("https://luminous-fire-4441.firebaseio.com/days");
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NybS1kZW1vLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyIsImF1ZCI6InA1b3F1MXhjNFU3QThrM3ZpbVdpVjd0QXBsTkxONlp6IiwiZXhwIjoxNDQ5NTUzMzQ5LCJpYXQiOjE0NDk1MTczNDksInYiOjAsImQiOnsiZmJfaWQiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyJ9LCJhenAiOiJwNW9xdTF4YzRVN0E4azN2aW1XaVY3dEFwbE5MTjZaeiJ9.a4Q8D39U7RJ3cPVYOU-tSjSJlmmyY-HR2KumaRdIwqQ";
    friendsRef.authWithCustomToken(token, function(error, auth) {
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

        var slots = {
            0900: {
                time: '9:00am',
                booked: false
            },
            0110: {
                time: '11:00am',
                booked: false
            },
            1500: {
                time: '03:00pm',
                booked: false
            },
        };


        friendsRef.set({
            Monday: {
                name: 'Monday',
                slots: slots
            },
            Tuesday: {
                name: 'Tuesday',
                slots: slots
            },
            Wednesday: {
                name: 'wednesday',
                slots: slots
            },
            Thursday: {
                name: 'Thursday',
                slots: slots
            },
            Friday: {
                name: 'Friday',
                slots: slots
            }


        }, function (err) {
            if (!err) {
                console.log("Reset successful !");
            }
        });

    }

    var _slots = function() {
        return {
            0900: {
                time: '9:00am',
                booked: false
            },
            0110: {
                time: '11:00am',
                booked: false
            },
            1500: {
                time: '03:00pm',
                booked: false
            },
        };
    }
}

