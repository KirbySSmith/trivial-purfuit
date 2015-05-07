(function () {
    'use strict';

    angular.module('app.setUp', [])
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {
        $routeProvider.when('/setup', {
            templateUrl: 'setUp/setUp.html'
        });
    }

})();
