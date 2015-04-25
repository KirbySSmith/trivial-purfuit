
/**
 * Created by ksmit207 on 1/2/2015.
 */
(function () {
    'use strict';

    angular.module('app.mainMenu')
        .controller('MainMenu', MainMenu);



    MainMenu.$inject = ['$location'];

    function MainMenu($location){
        var vm = this;
    }
})();