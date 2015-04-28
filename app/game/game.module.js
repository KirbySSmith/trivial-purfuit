/**
 * Created by ksmit207 on 1/13/2015.
 */
(function () {
    'use strict';

    angular.module('app.game', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game.html',
            controller: 'Game'
        })
    }

})();
