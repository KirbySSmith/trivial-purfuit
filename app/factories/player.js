(function () {
  'use strict';
  angular.module('app').factory('Player',Player).directive('PurfuitGamePiece', PurfuitGamePiece);

  Player.$inject = ['Enum'];
  function Player(Enum){
    /*
     * Player Class
     */
    function Player(name, initialBoardSpace){
      this.name = name;
      this.boardLocation = initialBoardSpace;
      this.gamePiece = angular.element("<PurfuitGamePiece/>");
      $animate.enter(this.gamePiece, this.boardLocation);
    }
    //Static
    Player.availableDirections = function (currentSpace, previousSpace, adjacentSpaces){
      var availableDirections = [];
      angular.forEach(adjacentSpaces, function(value, key){
        if(!previousSpace || value.id != previousSpace.id){
          if(currentSpace.yBoardPosition != value.yBoardPosition){
            if(currentSpace.yBoardPosition < value.yBoardPosition){
              availableDirections.push(Enum.direction.up)
            }else{
              availableDirections.push(Enum.direction.down)
            }
          }else{
            if(currentSpace.xBoardPosition < value.xBoardPosition){
              availableDirections.push(Enum.direction.left)
            }else{
              availableDirections.push(Enum.direction.right)
            }
          }
        }
      }, availableDirections);
      return availableDirections;
    };

    Player.findNextSpace = function (currentSpace, adjacentSpaces, direction){
      var nextSpaceY = currentSpace.yBoardPosition;
      var nextSpaceX = currentSpace.xBoardPosition;
      var nextSpace;
      switch (direction){
        case Enum.direction.up:
          nextSpaceY = currentSpace.yBoardPosition - 1;
          break;
        case Enum.direction.right:
          nextSpaceX = currentSpace.xBoardPosition + 1;
          break;
        case Enum.direction.down:
          nextSpaceY = currentSpace.yBoardPosition + 1;
          break;
        case Enum.direction.left:
          nextSpaceX = currentSpace.xBoardPosition - 1;
          break;
      }
      angular.forEach(adjacentSpaces, function(value, key){
        if(nextSpaceY == value.yBoardPosition && nextSpaceX == value.xBoardPosition) nextSpace = value;
      },nextSpace);
      return nextSpace;
    };


    /*
     * Update location
     * Parameters:
     *  numberOfMoves - number of spaces to move
     *  requestDirection - request direction from user call back
     */
    Player.prototype.updateLocation = function(numberOfMoves, promptForDirection){

      var previousSpace;
      var adjacentSpaces = this.boardLocation.adjacentSpaces();

      var availableDirections = Player.availableDirections(this.boardLocation, previousSpace, adjacentSpaces);
      var directionToMove;
      if(availableDirections.size() > 1){
        directionToMove = promptForDirection(availableDirections);
      }else{
        directionToMove = availableDirections[0];
      }
      previousSpace = this.boardLocation;
      this.boardLocation = Player.findNextSpace(directionToMove, adjacentSpaces, directionToMove);

      //save context to that for animation call back
      var that = this;
      //animate current move then call next move
      $animate
          .move(this.gamePiece, angular.element("#boardSpace"+this.boardLocation.id))
          .then(function(){
            if(numberOfMoves > 1){
              that.updateLocation(numberOfMoves - 1, promptForDirection);
            }
          });

    };

    Player.prototype.collectCategory = function(categoryId){

    };


    return Player;
  }
  function PurfuitGamePiece(){
    return {
      restrict: 'E',
      templateUrl: 'my-customer.html'
    };
  }
})();
