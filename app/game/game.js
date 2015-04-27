
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Game', 'Question', 'Category', 'BoardSpace'];

    function Game($location, Player, Game, Question, Category, BoardSpace){
      var vm = this;
    }
})();
