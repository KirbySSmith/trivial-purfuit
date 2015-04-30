
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Game', 'Question', 'Category', 'BoardSpace'];

    function Game($location, Player, Game, Question, Category, BoardSpace){
        D6.baseUrl = "assets/images/diceRoll/";
        D6.dice(2, function(result){
            //callback as example
            console.log(result)
        });
        var vm = this;
        vm.boardSpaces = BoardSpace.query();
        console.log(vm.boardSpaces);
        var boardSpaces = vm.boardSpaces;
    }
})();
