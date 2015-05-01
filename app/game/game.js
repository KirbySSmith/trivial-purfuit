
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Question', 'Category', 'BoardSpace'];

    function Game($location, Player, Question, Category, BoardSpace){
        var vm = this;

        vm.boardSpaces = [];
        vm.players = [];
        vm.players.push(new Player(" Kirby"));

        D6.baseUrl = "assets/images/diceRoll/";
        D6.dice(2, function(result){
            vm.players[0].updateLocation(result, promptForDirection);
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
