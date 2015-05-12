(function () {
    'use strict';

    angular.module('app.setUp')
        .controller('SetUp', SetUp);


    SetUp.$inject = ['Player'];

    function SetUp(Player){
        var vm            = this,
            defaultColors = ["#ec452f", "#1d1d1d", "#021ea8", "#59ba0b"];

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
            var test = vm.validate();
            if ( vm.validate() ){
                Player.setPlayers(vm.tempPlayers);
            } else {
                event.preventDefault();
                $(".error-message").fadeIn(2000).fadeOut(1000);
            }
        }

        vm.validate = function(){
            var emptyName = _.filter($(".player-name"), function(item){
                return item.value == "";
            })

            return ! emptyName.length > 0
        }
    }
})();
