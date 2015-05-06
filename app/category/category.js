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
