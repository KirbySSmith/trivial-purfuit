(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', '$location'];

    function Shell($timeout, $location) {
        /*jshint validthis: true */
        var vm = this;

        vm.isBusy = true;
        vm.showSplash = true;
        vm.isActive = isActive;
        activate();

        function activate() {
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([]).then(hideSplash);
            hideSplash();
        }

        //Set active nav link
        //source: http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
        function isActive(viewLocation){
            var locationPath = $location.path();
            return locationPath.indexOf(viewLocation) == 0;
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();