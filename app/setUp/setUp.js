(function () {
    'use strict';

    angular.module('app.setUp')
        .controller('SetUp', SetUp);


    SetUp.$inject = ['Player'];

    function SetUp(Player){
        var vm            = this,
            defaultColors = ["#ec452f", "#ffffff", "#0433ff", "#00f900"];

        if ( Player.playerList.length > 0 ){
            vm.tempPlayers = angular.copy(Player.all());
        } else {
            vm.tempPlayers = [new Player(1,"",defaultColors[0])];
        }

        vm.updateCount = function (newNumber) {
            if ( newNumber > vm.tempPlayers.length ){
                while ( newNumber > vm.tempPlayers.length ){
                    vm.tempPlayers.push(new Player(vm.tempPlayers.length + 1, "", defaultColors[vm.tempPlayers.length]));
                }
            } else {
                while ( newNumber < vm.tempPlayers.length ){
                    vm.tempPlayers.pop();
                }
            }
        }

        vm.save = function(){
            Player.setPlayers(vm.tempPlayers);
        }
    }
})();
