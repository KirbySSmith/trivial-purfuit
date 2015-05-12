
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageCategories')
        .controller('ManageCategories', ManageCategories);


    ManageCategories.$inject = ['$location', 'QuestionBank', 'Category', 'Question'];

    function ManageCategories($location, QuestionBank, Category, Question){
        var vm = this;
        //Category.forId(1);

        Category.loadWithCallback(function(response){ vm.categories = response; })

        vm.save = function(){
            if ( vm.validate() ){
                Category.categoryList = this.categories;
                $(".success-message").fadeIn(2000).fadeOut(1000);
                $(".error-message").hide();
            } else {
                event.preventDefault();
                $(".error-message").fadeIn(2000);
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
