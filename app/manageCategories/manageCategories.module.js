/**
 * Created by ksmit207 on 1/13/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageCategories', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/manage-categories', {
            templateUrl: 'manageCategories/manageCategories.html'
        });
    }

})();
