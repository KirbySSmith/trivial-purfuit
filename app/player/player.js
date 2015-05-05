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
      this.previousSpace = null;
      this.adjacentSpaceList = [];
    }

    /*
     * Update location
     * Parameters:
     *  numberOfMoves - number of spaces to move
     *  requestDirection - request direction from user call back
     */
    Player.prototype.move = function(promptForDirection, nextTurn){
      var that = this;
      return BoardSpace.findAdjacentSpaces(this.boardLocation).then(function(adjacentSpaceList)
      {
        that.adjacentSpaceList = adjacentSpaceList;
        var availableDirections = that.availableDirections();
        var directionToMove;
        if(availableDirections.length > 1){
          promptForDirection(availableDirections);
        }else{
          that.movePiece(promptForDirection, nextTurn, availableDirections[0]);
        }
      });
    };

    Player.prototype.movePiece = function(promptForDirection, nextTurn, directionToMove){
      var that = this;
      this.previousSpace = that.boardLocation;
      this.boardLocation = that.findNextSpace(directionToMove);
      this.numberOfMoves--;
      if(this.numberOfMoves > 0) {
        $timeout(function(){that.move(promptForDirection)}, 500);
      }else{
        $timeout(function(){
          that.numberOfMoves = 0;
          that.previousSpace = null;
            Player.prototype.showQuestion();
        }, 500);
      }
    };

      Player.prototype.showQuestion = function(){
          var that = this;
          //need to get question category, for now
          var category = 'cat-holiday';
          var categoryText = 'Places';
          //need to get new question, for now
          var newQuestion = 'The last man to sign the Declaration of Independence, Matthew Thornton, was from which colony?';
          $('#category-title').className = '';
          $('#category-title').text(categoryText);
          $('#category-title').addClass(category);
          $('.question').text(newQuestion);
          $('#continueBtn').hide();
          $('#questionModal').modal('show');
      };

      Player.prototype.showRollAgain = function(){
          var that = this;
          //need to get question category, for now
          $('#category-title').className = '';
          $('#category-title').text("Congratulations!");
          $('.question').text("It's still your turn. Roll again");
          $('#rightAnswerBtn').hide();
          $('#wrongAnswerBtn').hide();
          $('.question-status').hide();
          $('#continueBtn').show();
      };

    //Static
    Player.prototype.availableDirections = function (){
      var availableDirections = [];
      var that = this;
      angular.forEach(this.adjacentSpaceList, function(value, key){
        if(!that.previousSpace || value.id != that.previousSpace.id){
          if(that.boardLocation.yBoardPosition != value.yBoardPosition){
            if(that.boardLocation.yBoardPosition > value.yBoardPosition){
              availableDirections.push(Enum.direction.up)
            }else{
              availableDirections.push(Enum.direction.down)
            }
          }else{
            if(that.boardLocation.xBoardPosition > value.xBoardPosition){
              availableDirections.push(Enum.direction.left)
            }else{
              availableDirections.push(Enum.direction.right)
            }
          }
        }
      }, availableDirections);
      return availableDirections;
    };


    Player.prototype.findNextSpace = function (direction){
      var nextSpaceY = this.boardLocation.yBoardPosition;
      var nextSpaceX = this.boardLocation.xBoardPosition;
      var nextSpace;
      switch (direction){
        case Enum.direction.up:
          nextSpaceY = this.boardLocation.yBoardPosition - 1;
          break;
        case Enum.direction.right:
          nextSpaceX = this.boardLocation.xBoardPosition + 1;
          break;
        case Enum.direction.down:
          nextSpaceY = this.boardLocation.yBoardPosition + 1;
          break;
        case Enum.direction.left:
          nextSpaceX = this.boardLocation.xBoardPosition - 1;
          break;
      }
      angular.forEach(this.adjacentSpaceList, function(value, key){
        if(nextSpaceY == value.yBoardPosition && nextSpaceX == value.xBoardPosition) nextSpace = value;
      },nextSpace);
      return nextSpace;
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
