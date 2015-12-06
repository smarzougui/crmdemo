// Home controller

var $scope;
var $firebaseAuth;


angular.module('crmDemo.home').controller('HomeController', LoginController);
LoginController.$inject = ['$scope', '$firebaseAuth', 'auth', 'store', '$firebaseArray'];

function LoginController($scope, firebaseAuth, auth, store, $firebaseArray) {

    $firebaseAuth = firebaseAuth;
    $scope.auth = auth;
    $scope.store = store;

    $scope.user = {};


    // Grab the token
    var firebaseToken = store.get('firebaseToken');


    $scope.reset = function() {

        var friendsRef = new Firebase("https://luminous-fire-4441.firebaseio.com/days");
        // Here we're using the Firebase Token we stored after login

        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2Fmd2VuIE1hcnpvdWd1aSIsImVtYWlsIjoic2Fmd2VuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2NybS1kZW1vLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyIsImF1ZCI6InA1b3F1MXhjNFU3QThrM3ZpbVdpVjd0QXBsTkxONlp6IiwiZXhwIjoxNDQ5NDU1MjE3LCJpYXQiOjE0NDk0MTkyMTcsInYiOjAsImQiOnsiZmJfaWQiOiJnb29nbGUtb2F1dGgyfDExMjczMjM3MjI2ODg5MDM4NTIxMyJ9LCJhenAiOiJwNW9xdTF4YzRVN0E4azN2aW1XaVY3dEFwbE5MTjZaeiJ9.Y_LoyEK89W-F_r1qCGUhH-XfURVYF2Ts_bL1uMxMQuk";
        friendsRef.authWithCustomToken(token, function(error, auth) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", auth);
            }
        });

        var fb = $firebaseArray(friendsRef);

        fb.$add({
            monday: {
                name: 'Monday',
                slots: {
                    0900: {
                        time: '9:00am',
                        booked: false
                    },
                    0110: {
                        time: '11:00am',
                        booked: false
                    }
                }
            },
            tuesday: {
                name: 'Tuesday',
                slots: {
                    0900: {
                        time: '9:00am',
                        booked: false
                    },
                    0110: {
                        time: '11:00am',
                        booked: false
                    }
                }
            }
        });


    }

}

