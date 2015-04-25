/**
 * Created by ksmit207 on 1/13/2015.
 */
(function () {
    'use strict';

    angular.module('app.mainMenu', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'mainMenu/mainMenu.html',
            controller: 'MainMenu'
        }).otherwise({
            templateUrl: 'mainMenu/mainMenu.html'
        });
    }

})();