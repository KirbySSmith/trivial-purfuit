
/**
 * Created by ksmit207 on 4/27/2015.
 * Reference: http://stackoverflow.com/questions/17494914/use-angularjs-ngresource-to-load-json-file-from-localhost
 */
(function () {
    'use strict';

    angular.module('app.boardSpace')
        .factory('BoardSpace', BoardSpace);

    BoardSpace.$inject = ['$http', 'Enum'];

    function BoardSpace($http, Enum){
        // Create an internal promise that resolves to the data inside project.json;
        // we'll use this promise in our own API to get the data we need.
        var json = $http.get('boardSpace/boardSpace.json').then(function(response) {
            return response.data;
        });

        /**
         * Constructor, with class name
         */
        function BoardSpace(data) {
            // Public properties, assigned to the instance ('this')
            this.id = data.id;
            this.yBoardPosition = data.yBoardPosition;
            this.xBoardPosition = data.xBoardPosition;
            this.spokeSpace = data.spokeSpace;
            this.centerSpace = data.centerSpace;
            this.rollAgain = data.rollAgain;
            this.borderLeft = data.borderLeft;
            this.borderTop = data.borderTop;
            this.categoryId = data.categoryId;
            this.headquarters = data.headquarters || false;
            this.top = this.yBoardPosition * 14.285;
            this.left = this.xBoardPosition * 14.285;
            /*this.borderLeft = this.xBoardPosition == 0 || (this.spokeSpace && this.yBoardPosition != 3);*/
        }



        // The query function returns an promise that resolves to
        // an array of BoardSpace, one for each in the JSON.
        BoardSpace.query = function() {
            return json.then(function(data) {
                return data.map(function(boardSpace) {
                    return new BoardSpace(boardSpace);
                });
            })
        };

        // The get function returns a promise that resolves to a
        // specific boardSpace, found by ID. We find it by looping
        // over all of them and checking to see if the IDs match.
        BoardSpace.get = function(id) {
            json.then(function(data) {
                var result = null;
                data.forEach(function(boardSpace) {
                    if (boardSpace.id == id) result = new BoardSpace(boardSpace);
                });
                return result;
            });
        };

        function spaceAdjacent(currentSpace, boardSpace){
            return verticallyAdjacent(currentSpace, boardSpace) || horizontallyAdjacent(currentSpace, boardSpace);
        }

        function verticallyAdjacent(currentSpace, boardSpace){
            return (boardSpace.yBoardPosition == currentSpace.yBoardPosition - 1 || boardSpace.yBoardPosition == currentSpace.yBoardPosition + 1) && boardSpace.xBoardPosition == currentSpace.xBoardPosition;
        }

        function horizontallyAdjacent(currentSpace, boardSpace){
            return (boardSpace.xBoardPosition == currentSpace.xBoardPosition - 1 || boardSpace.xBoardPosition == currentSpace.xBoardPosition + 1) && boardSpace.yBoardPosition == currentSpace.yBoardPosition
        }


        BoardSpace.findAdjacentSpaces = function(currentSpace){
            return BoardSpace.query().then(function(boardSpaces) {
                var adjacentList = [];
                boardSpaces.forEach(function(boardSpace) {
                    if (spaceAdjacent(currentSpace, boardSpace)){
                        adjacentList.push(boardSpace);
                    }
                });
                return adjacentList;
            });

        };


        // Finally, the factory itself returns the entire
        // Project constructor (which has `query` and `get` attached).
        return BoardSpace;
    }
})();
