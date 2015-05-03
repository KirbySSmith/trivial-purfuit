(function () {
  'use strict';
  angular.module('app').factory('Player',Player);

  Player.$inject = ['Enum', 'BoardSpace', '$timeout'];
  function Player(Enum, BoardSpace, $timeout){
    /*
     * Player Class
     */
    function Player(id, name, bgColor){
      this.id = id;
      this.name = name;
      this.boardLocation = {};
      this.currentPlayer = false;
      this.bgColor = bgColor;
      this.numberOfMoves = 0;
      this.categoryOneCollected = false;
      this.categoryTwoCollected = false;
      this.categoryThreeCollected = false;
      this.categoryFourCollected = false;
    }


    /*
     * Update location
     * Parameters:
     *  numberOfMoves - number of spaces to move
     *  requestDirection - request direction from user call back
     */
    Player.prototype.updateLocation = function(numberOfMoves, promptForDirection, nextTurn, previousSpace ){
      this.numberOfMoves = numberOfMoves;
      var that = this;
      return BoardSpace.findAdjacentSpaces(this.boardLocation).then(function(adjacentList)
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
          $timeout(function(){that.updateLocation(numberOfMoves, promptForDirection, nextTurn, previousSpace)}, 500);
        }else{
          $timeout(function(){that.numberOfMoves = 0; nextTurn()}, 500);
        }
      });
    };

    Player.prototype.collectCategory = function(categoryId){
      switch(categoryId){
        case 1:
          this.categoryOneCollected = true;
          break;
        case 2:
          this.categoryTwoCollected = true;
          break;
        case 3:
          this.categoryThreeCollected = true;
          break;
        case 4:
          this.categoryFourCollected = true;
          break;
      }
    };

    return Player;
  }

})();
