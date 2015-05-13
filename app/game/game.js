
(function () {
    'use strict';

    angular.module('app.game')
        .controller('Game', Game);


    Game.$inject = ['$location', 'Player', 'Question', 'Category', 'BoardSpace', 'Enum', 'QuestionBank'];

    function Game($location, Player, Question, Category, BoardSpace, Enum, QuestionBank){
        var vm = this;

        vm.players = Player.all();
        if ( vm.players.length == 0 ){
            $location.path( "setup/" )
            return;
        }

        QuestionBank.prepareForGame();
        Category.loadWithCallback(function(response){ vm.categories = response; });

        vm.boardSpaces = [];

        //vm.players.push(new Player(1, "Kirby", "#99cc99"));
        //vm.players.push(new Player(2, "Tommy", "#cc99cc"));
        //vm.players.push(new Player(3, "Frances", "#ffdb99"));
        //vm.players.push(new Player(4, "Sam", "#ffff7f"));
        vm.currentPlayerIndex = 0;
        CustomD6.baseUrl = "assets/images/diceRoll/";
        vm.disableDirectionUp = true;
        vm.disableDirectionRight = true;
        vm.disableDirectionDown = true;
        vm.disableDirectionLeft = true;
        vm.disableRoll = false;
        vm.answerHidden = true;
        vm.demo = false;

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
            vm.players[vm.currentPlayerIndex].move(promptForDirection, nextTurn, vm.showQuestion, vm.showRollAgain);
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
            vm.players[vm.currentPlayerIndex].movePiece(promptForDirection, nextTurn, vm.showQuestion, vm.showRollAgain, direction);
        };

        vm.showAnswerClick = function(){
            vm.answerHidden = false;
        };
        vm.rightAnswerClick = function(){
            vm.answerHidden = true;
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

            $('#questionModal').modal('hide');
            modal.find(".header-name").text(player.name);
            modal.modal();
        };

        vm.continueClick = function(){
            vm.answerHidden = true;
            var that = this;
            var modal =  $('#questionModal');
            modal.modal('hide');
            modal.addClass('rollAgain');
            modal.removeClass('continue');
            vm.disableRoll = false;
        };

        vm.wrongAnswerClick = function(){
            vm.answerHidden = true;
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

        vm.continueToFinalQuestion = function(categoryId){
            var modal =  $('#chooseFinalCategory');
            modal.modal('hide');
            vm.showQuestion(categoryId);
        };

        vm.showQuestion = function(categoryId){
            var that = this,
                categoryId = categoryId || vm.players[vm.currentPlayerIndex].boardLocation.categoryId,
                catTitle = $('#category-title'),
                question = QuestionBank.getQuestionforCategory(categoryId),
                category = Category.find(categoryId);

            if ( question.text == undefined ){
              $('.question').text("Uh oh. out of questions!");
            }else{
              $('.question').text(question.text);
              $('.answer').text(question.answer);
            }

            catTitle.className = '';
            catTitle.text(category.title);
            catTitle.addClass(category);

            var modal =  $('#questionModal');

            modal.addClass('rollAgain');
            modal.removeClass('continue');
            modal.modal('show');
        }
        vm.demoMode = function(){
            vm.demo = true;
        };

    }

})();
