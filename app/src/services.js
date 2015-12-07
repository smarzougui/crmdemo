/**
 * Created by smu on 04/12/2015.
 */

userInitDataService.$inject = [];
angular.module('crmDemo').factory('userInitDataService', userInitDataService);

function userInitDataService() {

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


    return {
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
    };


}