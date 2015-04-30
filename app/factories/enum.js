//reference: http://stackoverflow.com/questions/16627860/angular-js-and-ng-swith-when-emulating-enum
angular.module('app').factory('Enum', [ function () {
        return {
            direction: {up:1, right:2, down:3, left:4}
        };
    }]);