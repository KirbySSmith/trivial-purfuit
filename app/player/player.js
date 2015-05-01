(function () {
  'use strict';
  angular.module('app').factory('Player',Player);

  Player.$inject = ['Enum', 'BoardSpace', '$timeout'];
  function Player(Enum, BoardSpace, $timeout){
    /*
     * Player Class
     */
    function Player(name){
      this.name = name;
      this.boardLocation = {};
    }


    /*
     * Update location
     * Parameters:
     *  numberOfMoves - number of spaces to move
     *  requestDirection - request direction from user call back
     */
    Player.prototype.updateLocation = function(numberOfMoves, promptForDirection, previousSpace){
      var that = this;
      BoardSpace.findAdjacentSpaces(this.boardLocation).then(function(adjacentList)
      {
        var availableDirections = BoardSpace.availableDirections(that.boardLocation, previousSpace, adjacentList);
        var directionToMove;
        if(availableDirections.length > 1){
          directionToMove = promptForDirection(availableDirections);
        }else{
          directionToMove = availableDirections[0];
        }
        previousSpace = that.boardLocation;
        that.boardLocation = BoardSpace.findNextSpace(that.boardLocation, adjacentList, directionToMove);
        numberOfMoves--;
        if(numberOfMoves > 0) {
          $timeout(function(){that.updateLocation(numberOfMoves, promptForDirection, previousSpace)}, 500);
        }
      });
    };

    Player.prototype.collectCategory = function(categoryId){

    };

    return Player;
  }

})();
