/**
 */
(function () {
    'use strict';

    angular.module('app.category')
        .factory('Category', Category);

    Category.$inject = ['$http', 'Enum'];

    function Category($http, Enum){
        // Create an internal promise that resolves to the data inside project.json;
        // we'll use this promise in our own API to get the data we need.
        var json = $http.get('category/categories.json').then(function(response) {
            return response.data;
        });
        Category.categoryList = [];

        /**
         * Constructor, with class name
         */
        function Category(data) {
            // Public properties, assigned to the instance ('this')
            this.title = data.title;
            this.id = data.id;
            this.color = data.color;
        }

        Category.loadCategories = function() {
            json.then(function(data) {
                Category.categoryList = data.map(function(category) {
                    return new Category(category);
                });
            })
        }

        Category.loadWithCallback = function(callback) {
            if ( Category.categoryList.length > 0 ){
                callback(angular.copy(Category.categoryList));
            } else {
                json.then(function(data) {
                    Category.categoryList = data.map(function(category) {
                        return new Category(category);
                    });
                    callback(angular.copy(Category.categoryList));
                })
            }
        }

        Category.find = function(id){
            return _.findWhere(this.categoryList, {id: id});
        }

        /*
         * Load all categories from the json file
         * Return an array of Category instances
         */
        Category.query = function() {
            return json.then(function(data) {
                return data.map(function(category) {
                    return new Category(category);
                });
            })
        };

        return Category;
    }
})();
