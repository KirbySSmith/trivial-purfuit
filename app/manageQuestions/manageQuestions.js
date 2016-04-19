/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageQuestions')
        .controller('ManageQuestions', ManageQuestions);


    ManageQuestions.$inject = ['$scope', '$location', 'QuestionBank', 'Category', 'Question'];

    function ManageQuestions($scope, $location, QuestionBank, Category, Question){
        var vm = this;
        //Category.forId(1);

        QuestionBank.loadWithCallback(function(response){ vm.questions = response; });

        Category.loadWithCallback(function(response){ vm.categories = response; });

        vm.deleteQuestion = function(question){
          var index = this.questions.indexOf(question);
          this.questions.splice(index, 1);
        }

        vm.addQuestion = function(){
          var newId = this.questions.length + 1;
          this.questions.push(new Question({id: newId}));
        }

        vm.save = function(){
          if ( vm.validate() ){
              QuestionBank.allQuestions = this.questions;
              QuestionBank.resetHash();
              Category.categoryList = this.categories;
              $(".success-message").fadeIn(2000).fadeOut(1000);
              $(".error-message").hide();
          } else {
              event.preventDefault();
              $(".error-message").fadeIn(2000);
          }
        }

        vm.exportQuestions = function() {
          var jsonQuestions = JSON.stringify(QuestionBank.allQuestions),
              a             = document.createElement('a');

          a.href        = 'data:attachment/json,' + encodeURIComponent(jsonQuestions);
          a.target      = '_blank';
          a.download    = 'myFile.json';

          document.body.appendChild(a);
          a.click();
          $(a).remove();
        }

        vm.loadFile = function() {
          var files = $("#files")[0].files, // FileList object
              file  = _.first(files),
             reader = new FileReader();

          reader.onload = (function(theFile) {
            return function(e) {
              QuestionBank.loadJSONWithCallback(e.target.result, function(response){
                vm.questions = response; $scope.$apply();
              });
            };
          })(file);

          if ( file ){
              reader.readAsText(file);
          }
        }
        vm.validate = function(){
            var emptyName = _.filter($(".validate"), function(item){
                return item.value == "";
            })

            return ! emptyName.length > 0
        }
    }

})();
