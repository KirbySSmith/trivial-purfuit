
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'BoardSpace'];

    function Game($location, BoardSpace){
        var vm = this;
        vm.boardSpaces = BoardSpace.query();
    }
})();
