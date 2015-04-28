
/**
 * Created by ksmit207 on 4/27/2015.
 * Reference: http://stackoverflow.com/questions/17494914/use-angularjs-ngresource-to-load-json-file-from-localhost
 */
(function () {
    'use strict';

    angular.module('app.boardSpace')
        .factory('BoardSpace', BoardSpace);

    BoardSpace.$inject = ['$http'];

    function BoardSpace($http){
        // Create an internal promise that resolves to the data inside project.json;
        // we'll use this promise in our own API to get the data we need.
        var json = $http.get('boardSpace/boardSpace.json').then(function(response) {
            return response.data;
        });

        /**
         * Constructor, with class name
         */
        var BoardSpace = function (data) {
            // Public properties, assigned to the instance ('this')
            this.id = data.id;
            this.yBoardPossition = data.yBoardPossition;
            this.xBoardPossition = data.xBoardPossition;
            this.spokeSpace = data.spokeSpace;
            this.centerSpace = data.centerSpace;
            this.rollAgain = data.rollAgain;
        };

        // The query function returns an promise that resolves to
        // an array of Projects, one for each in the JSON.
        BoardSpace.query = function() {
            return json.then(function(data) {
                return data.map(function(boardSpace) {
                    return new BoardSpace(boardSpace);
                });
            })
        };

        // The get function returns a promise that resolves to a
        // specific project, found by ID. We find it by looping
        // over all of them and checking to see if the IDs match.
        BoardSpace.get = function(id) {
            return json.then(function(data) {
                var result = null;
                angular.forEach(data, function(boardSpace) {
                    if (boardSpace.id == id) result = new BoardSpace(boardSpace);
                });
                return result;
            })
        };

        // Finally, the factory itself returns the entire
        // Project constructor (which has `query` and `get` attached).
        return BoardSpace;
    }
})();