/**
 * Created by ksmit207 on 1/13/2015.
 */
(function () {
    'use strict';

    angular.module('app.manageQuestions', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/manage-questions', {
            templateUrl: 'manageQuestions/manageQuestions.html',
            controller: 'ManageQuestions'
        });
    }

})();
