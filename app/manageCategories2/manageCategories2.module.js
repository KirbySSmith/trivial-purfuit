/**
 * Created by ksmit207 on 1/13/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageCategories2', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/manage-categories2', {
            templateUrl: 'manageCategories2/manageCategories2.html'
        });
    }

})();
