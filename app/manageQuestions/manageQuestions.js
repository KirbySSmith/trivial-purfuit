
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageQuestions')
        .controller('ManageQuestions', ManageQuestions);


    ManageQuestions.$inject = ['$location', 'QuestionBank', 'Category', 'Question'];

    function ManageQuestions($location, QuestionBank, Category, Question){
        var vm = this;
        //Category.forId(1);

        QuestionBank.loadWithCallback(function(response){ vm.questions = response; });

        Category.query().then(function(response){ vm.categories = response; })


        vm.deleteQuestion = function(question){
          var index = this.questions.indexOf(question);
          this.questions.splice(index, 1);
        }

        vm.addQuestion = function(){
          var newId = this.questions.length + 1;
          this.questions.push(new Question({id: newId}));
        }

        vm.saveQuestions = function(){
          QuestionBank.allQuestions = this.questions;
          QuestionBank.resetHash();
        }
    }
})();
