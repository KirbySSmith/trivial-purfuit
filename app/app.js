(function () {
    'use strict';
  // Declare app level module which depends on views, and components
  angular.module('app', [
      'app.core',
      'app.layout',
      'app.mainMenu',
      'app.boardSpace',
      'app.category',
      'app.questionBank',
      'app.manageQuestions',
      'app.manageCategories',
      'app.game'
  ]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
    //Work around for nav page load
      .run(['$route', function($route)  {
        $route.reload();
      }])
})();
