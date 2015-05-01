
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Question', 'Category', 'BoardSpace'];

    function Game($location, Player, Question, Category, BoardSpace){
        var vm = this;

        vm.boardSpaces = [];
        vm.players = [];
        vm.players.push(new Player(1, "Kirby"));
        vm.players.push(new Player(2, "Tommy"));
        vm.players.push(new Player(3, "Frances"));
        vm.players.push(new Player(4, "Sam"));
        vm.currentPlayerIndex = 0;

        D6.baseUrl = "assets/images/diceRoll/";
        D6.dice(2, function(result){
            vm.players[vm.currentPlayerIndex].updateLocation(result, promptForDirection);
            if(vm.currentPlayerIndex < vm.players.length){
                vm.currentPlayerIndex = vm.currentPlayerIndex + 1 < vm.players.length ? vm.currentPlayerIndex + 1 : 0 ;
            }else{

            }
            console.log(result)
        });
        activate();

        function activate() {
            return BoardSpace.query().then(function(boardSpaces) {
                vm.boardSpaces = boardSpaces;
                vm.players.forEach(function(player){
                    player.boardLocation  = vm.boardSpaces[26];
                });
            });
        }


        var promptForDirection = function(directionList) {
            //Todo: a decision is need from user on which direction to travel
            return directionList[0];
        }

    }

})();
