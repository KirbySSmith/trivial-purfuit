(function () {
    'use strict';
    angular.module('app').directive('purfuitGamePiece', PurfuitGamePiece);
    //Directive for Player Game Piece
    function PurfuitGamePiece(){
        return {
            restrict: 'E',
            scope:{
                player:"="
            },
            templateUrl: 'player/purfuitGamePiece.html'
        };
    }

})();