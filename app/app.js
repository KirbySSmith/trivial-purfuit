(function () {
    'use strict';
  // Declare app level module which depends on views, and components
  angular.module('app', [
      'app.core',
      'app.layout',
      'app.mainMenu',
      'app.manageQuestions',
      'app.game'
  ]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
    //Work around for nav page load
      .run(['$route', function($route)  {
        $route.reload();
      }])

      .factory('Player', function(){
        /*
         * Player Class
         */
        function Player(name){
          this.name = name;
        }

        Player.prototype.updateLocation = function(){

        };

        Player.prototype.collectCategory = function(categoryId){

        };

        return Player;
      })

      .factory('Game', function(){
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

      .factory('Question', function(){
        /*
         * Question Class
         */
        function Question(text, answer, categoryId){
          this.text = text;
          this.answer = answer;
          this.categoryId = categoryId;
        }

        return Question;
      })

      .factory('Category', function(){
        /*
         * Category Class
         */
        function Category(name, color){
          this.text = text;
          this.answer = answer;
          this.categoryId = categoryId;
        }

        return Category;
      })

      .factory('BoardSpace', function(){
        /*
         * BoardSpace Class
         */
        function BoardSpace(categoryId, yBoardPosition, xBoardPosition, isSpokeSpace, isCenterSpace, isRollAgain, nextSpaces, previousSpaces){
          this.categoryId = categoryId;
          this.yBoardPosition = yBoardPosition;
          this.xBoardPosition = xBoardPosition;
          this.isSpokeSpace = isSpokeSpace;
          this.isCenterSpace = isCenterSpace;
          this.isRollAgain = isRollAgain;
          this.nextSpaces = nextSpaces;
          this.previousSpaces = previousSpaces;
        }

        return BoardSpace;
      });
})();
