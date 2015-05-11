(function () {
  'use strict';
  angular.module('app').factory('Player',Player);

  Player.$inject = ['Enum', 'BoardSpace', '$timeout', 'QuestionBank', 'Category'];
  function Player(Enum, BoardSpace, $timeout, QuestionBank, Category){
    /*
     * Player Class
     */
    Player.playerList = [];

    function Player(id, name, color){
      this.id = id;
      this.name = name;
      this.boardLocation = {};
      this.currentPlayer = false;
      this.color = color;
      this.numberOfMoves = 0;
      this.categoryOneCollected = false;
      this.categoryTwoCollected = false;
      this.categoryThreeCollected = false;
      this.categoryFourCollected = false;
      this.previousSpace = null;
      this.adjacentSpaceList = [];
    }

    Player.setPlayers = function(players){
        this.playerList = players;
    }

    Player.all = function(){
        return this.playerList;
    }

    Player.prototype.bgColor = function(){
        return ColorLuminance(this.color, +.9);
    }

    Player.prototype.borderColor = function(){
        return this.color;
    }

    /*
     * Update location
     * Parameters:
     *  numberOfMoves - number of spaces to move
     *  requestDirection - request direction from user call back
     */
    Player.prototype.move = function(promptForDirection, nextTurn, rollAgain){
      var that = this;
      return BoardSpace.findAdjacentSpaces(this.boardLocation).then(function(adjacentSpaceList)
      {
        that.adjacentSpaceList = adjacentSpaceList;
        var availableDirections = that.availableDirections();
        var directionToMove;
        if(availableDirections.length > 1){
          promptForDirection(availableDirections);
        }else{
          that.movePiece(promptForDirection, nextTurn, rollAgain, availableDirections[0]);
        }
      });
    };

    Player.prototype.movePiece = function(promptForDirection, nextTurn, rollAgain, directionToMove){
      var that = this;
      this.previousSpace = that.boardLocation;
      this.boardLocation = that.findNextSpace(directionToMove);
      this.numberOfMoves--;
      if(this.numberOfMoves > 0) {
        $timeout(function(){that.move(promptForDirection, nextTurn, rollAgain)}, 500);
      } else {
        $timeout(function(){
          if ( that.boardLocation.rollAgain ){
            that.rollAgain(rollAgain);
          } else if ( that.boardLocation.centerSpace ){
            that.landedOnCenter();
          } else {
            that.showQuestion();
          }
          that.numberOfMoves = 0;
          that.previousSpace = null;
        }, 500);
      }
    };

    Player.prototype.rollAgain = function(rollAgain){
      var modal =  $('#questionModal');
      modal.addClass('rollAgain');
      modal.removeClass('continue');
      modal.modal('show');
      rollAgain();
    }

    Player.prototype.landedOnCenter = function(){
      if ( this.allCakeCollected() ){
          this.showFinalQuestion();
      } else {
          //what do we do if on center square and not all squares collected?
      }
    }

    Player.prototype.showFinalQuestion = function(){
        //other users pick the category
    }

    Player.prototype.showQuestion = function(){
        var that = this,
            categoryId = this.boardLocation.categoryId,
            catTitle = $('#category-title'),
            category = 'cat-holiday',
            question = QuestionBank.getQuestionforCategory(categoryId),
            category = Category.find(categoryId);

        if ( question == undefined ){
          //uh oh. out of questions!
        }

        catTitle.className = '';
        catTitle.text(category.title);
        catTitle.addClass(category);
        $('.question').text(question.text);

        var modal =  $('#questionModal');

        modal.addClass('rollAgain');
        modal.removeClass('continue');
        modal.modal('show');
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

    Player.prototype.winsGame = function(){
      return this.boardLocation.centerSpace == 1 && this.allCakeCollected();
    }

    Player.prototype.collectIfHeadquarters = function(){
      if (this.boardLocation.headquarters){
        this.collectCategory();
      }
    }

    Player.prototype.allCakeCollected = function(){
      return this.categoryOneCollected && this.categoryTwoCollected && this.categoryThreeCollected && this.categoryFourCollected;
    }

    Player.prototype.collectCategory = function(){
      switch(this.boardLocation.categoryId){
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
