
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
          Category.categoryList = this.categories;
        }
    }
})();
