
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Question', 'Category', 'BoardSpace', 'Enum', 'QuestionBank'];

    function Game($location, Player, Question, Category, BoardSpace, Enum, QuestionBank){
        var vm = this;

        QuestionBank.prepareForGame();
        Category.loadWithCallback(function(response){ vm.categories = response; });

        vm.boardSpaces = [];
        vm.players = [];
        vm.players.push(new Player(1, "Kirby", "#99cc99"));
        vm.players.push(new Player(2, "Tommy", "#cc99cc"));
        vm.players.push(new Player(3, "Frances", "#ffdb99"));
        vm.players.push(new Player(4, "Sam", "#ffff7f"));
        vm.currentPlayerIndex = 0;
        CustomD6.baseUrl = "assets/images/diceRoll/";
        vm.disableDirectionUp = true;
        vm.disableDirectionRight = true;
        vm.disableDirectionDown = true;
        vm.disableDirectionLeft = true;
        vm.disableRoll = false;


        CustomD6.dice(2, takeTurn);
        activate();

        function activate() {
            return BoardSpace.query().then(function(boardSpaces) {
                vm.boardSpaces = boardSpaces;
                vm.players.forEach(function(player){
                    player.boardLocation  = vm.boardSpaces[26];
                });
                vm.players[vm.currentPlayerIndex].currentPlayer= true;
            });
        }

        function takeTurn(result) {
            vm.disableRoll = true;
            vm.players[vm.currentPlayerIndex].numberOfMoves = result;
            vm.players[vm.currentPlayerIndex].move(promptForDirection, nextTurn, vm.showRollAgain);
        }

        var nextTurn = function (){
            vm.players[vm.currentPlayerIndex].currentPlayer= false;
            vm.currentPlayerIndex = vm.currentPlayerIndex + 1 < vm.players.length ? vm.currentPlayerIndex + 1 : 0 ;
            vm.players[vm.currentPlayerIndex].currentPlayer= true;
            vm.disableRoll = false;
        };
        var promptForDirection = function(directionList) {
            vm.disableDirectionUp = directionList.indexOf(Enum.direction.up) == -1;
            vm.disableDirectionRight = directionList.indexOf(Enum.direction.right) == -1;
            vm.disableDirectionDown = directionList.indexOf(Enum.direction.down) == -1;
            vm.disableDirectionLeft = directionList.indexOf(Enum.direction.left) == -1;
        };
        vm.directionButtonClick = function(direction){
            vm.disableDirectionUp = true;
            vm.disableDirectionRight = true;
            vm.disableDirectionDown = true;
            vm.disableDirectionLeft = true;
            vm.players[vm.currentPlayerIndex].movePiece(promptForDirection, nextTurn, vm.showRollAgain, direction);
        };


        vm.rightAnswerClick = function(){
            var player = vm.players[vm.currentPlayerIndex];
            player.collectIfHeadquarters();

            if ( player.winsGame() ){
                //handle player winning
                vm.playerWins();
                console.log('player wins');
            } else {
                vm.showRollAgain();
            }
        };

        vm.resetGame = function(){
            //For now, just reload the page
            location.reload();
        };

        vm.goToSetup = function(){
            var modal = $('#winModal');
            modal.modal('hide');
            $('.modal-backdrop').remove();
        };

        vm.playerWins = function(){
            var modal  =  $('#winModal'),
                player = vm.players[vm.currentPlayerIndex];

            modal.find(".player-name").text(player.name);
            modal.modal({
                backdrop: 'static',
                keyboard: false
            });
        };

        vm.continueClick = function(){
            var that = this;
            var modal =  $('#questionModal');
            modal.modal('hide');
            modal.addClass('rollAgain');
            modal.removeClass('continue');
            vm.disableRoll = false;
        };

        vm.wrongAnswerClick = function(){
            var that = this;
           //wrong answer
            nextTurn();
        };

        vm.showRollAgain = function(){
            var that = this;
            var catTitle = $('#category-title');
            catTitle.className = '';
            catTitle.text("Congratulations!");
            $('.question').text("It's still your turn. Roll again");

            var modal =  $('#questionModal');
            modal.removeClass('rollAgain');
            modal.addClass('continue');
        };

        vm.rollDice = function(){
            CustomD6.roll();
        };
    }

})();
