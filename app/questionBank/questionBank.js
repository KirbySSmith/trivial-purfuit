/**
 */
(function () {
    'use strict';

    angular.module('app.questionBank')
        .factory('QuestionBank', QuestionBank);

    QuestionBank.$inject = ['$http', 'Enum', 'Category', 'Question'];

    function QuestionBank($http, Enum, Category, Question){
        //all loaded questions
        QuestionBank.allQuestions = [];

        //a hash of questions by category
        QuestionBank.questionsByCategory = {};

        //a list of questions that will be deleted from as the game progresses
        QuestionBank.gameQuestions = [];

        //a hash of questions by category that will be updated as the game progresses
        QuestionBank.gameQuestionsByCategory = {};

        /**
         * Constructor, with class name
         */
        function QuestionBank() {}
        
        QuestionBank.resetHash = function(){
            this.questionsByCategory = this.getNewHash(this.allQuestions);
        }

        QuestionBank.getNewHash = function(questions) {
            var self = this,
                hash = {};

            questions.forEach(function(question){
                hash[question.categoryId] = hash[question.categoryId] || [];
                hash[question.categoryId].push(question);
            })

            return hash;
        }

        QuestionBank.removeQuestionFromGame = function(question){
            var index = this.gameQuestions.lastIndexOf(question);
            this.gameQuestions.splice(index, 1);
            this.gameQuestionsByCategory = this.getNewHash(this.gameQuestions);
        }

        QuestionBank.getQuestionforCategory = function(id){
            if ( this.gameQuestionsByCategory[id] ){
                var question = this.pickRandomQuestion(this.gameQuestionsByCategory[id]);
                //TODO
                //Disable question removal until we have tons of questions
                //this.removeQuestionFromGame(question);
                return question;
            } else {
                return "No questions available for category";
            }
        }

        QuestionBank.pickRandomQuestion = function(questions){
            var randomNum = Math.floor(Math.random() * questions.length);
            return questions[randomNum];
        }

        QuestionBank.loadFromFile = function (file){
            return $http.get(file).then(function(response) {
                return response.data.map(function(question) {
                    return new Question(question);
                });
            })
        }

        /*
         * LoadWithCallback
         *
         * If QuestionBank has questions
         *  yield a copy of those to the callback provided
         *
         * Else
         *  load questions from file provided or default and yield the result
         *
         */
        QuestionBank.loadWithCallback = function(callback, file){
            var file = file || 'questionBank/questions.json';
            if ( QuestionBank.allQuestions.length > 0 ){
                callback(angular.copy(QuestionBank.allQuestions));
            } else {
                $http.get(file).then(function(response) {
                    QuestionBank.allQuestions = response.data.map(function(question) {
                        return new Question(question);
                    });
                    callback(angular.copy(QuestionBank.allQuestions));
                });
            }
        }

        QuestionBank.loadJSONWithCallback = function(jsonData, callback){
            QuestionBank.allQuestions = _.map(JSON.parse(jsonData), function(item){ return new Question(item)});
            callback(angular.copy(QuestionBank.allQuestions));
        }

        /*
         * PrepareforGame
         *
         * Meant to be called by the GameController.
         * If Questions have not been defined, load them from a file (defaulted to questionBank/questions.json)
         * Setup hash, define gameQuestions and gameQuestionsByCategory
         *
         */
        QuestionBank.prepareForGame = function(file){
            this.loadWithCallback(function(response){
                QuestionBank.resetHash();
                QuestionBank.gameQuestions = QuestionBank.allQuestions;
                QuestionBank.gameQuestionsByCategory = QuestionBank.questionsByCategory;
            })
        }

        return QuestionBank;
    }
})();
