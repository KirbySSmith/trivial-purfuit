angular.module('app').factory('Game', function(){
  /*
   * Question Game
   */
  function Game(){
    this.questionList = [];
    this.playerList = [];
  }

  Game.prototype.startGame = function(){

  }

  Game.prototype.nextTurn = function(){

  }

  Game.prototype.rollDice = function(){

  }

  Game.prototype.addQuestionToList = function(question){

  }

  Game.prototype.validateNumberOfPlayers = function(numberOfPlayers){
    return numberOfPlayers >= 1 && numberofPlayers <=4
  }

  return Game;
})
