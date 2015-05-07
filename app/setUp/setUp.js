(function () {
    'use strict';

    angular.module('app.setUp')
        .controller('SetUp', SetUp);


    SetUp.$inject = [];

    function SetUp(){
        var vm = this;
        vm.playerCount = function (players) {
            vm.count=[];
            for (var i = 0; i < players; i++) {
                vm.count.push({'count': i+1});
            }
        }
    }
})();
