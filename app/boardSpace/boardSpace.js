
/**
 * Created by ksmit207 on 4/27/2015.
 * Reference: http://stackoverflow.com/questions/17494914/use-angularjs-ngresource-to-load-json-file-from-localhost
 */
(function () {
    'use strict';

    angular.module('app')
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
            this.top = this.yBoardPosition * 14.285;
            this.left = this.xBoardPosition * 14.285;
            /*this.borderLeft = this.xBoardPosition == 0 || (this.spokeSpace && this.yBoardPosition != 3);*/
        }

        // The query function returns an promise that resolves to
        // an array of BoardSpace, one for each in the JSON.
        BoardSpace.query = function() {
            var list = [];
            json.then(function(data) {
                data.forEach(function(boardSpace) {
                    list.push(new BoardSpace(boardSpace));
                });
            });
            return list;
        };

        // The get function returns a promise that resolves to a
        // specific boardSpace, found by ID. We find it by looping
        // over all of them and checking to see if the IDs match.
        BoardSpace.get = function(id) {
            return json.then(function(data) {
                var result = null;
                data.forEach(function(boardSpace) {
                    if (boardSpace.id == id) result = new BoardSpace(boardSpace);
                });
                return result;
            })
        };

        // The get function returns a promise that resolves to a
        // specific board space, found by X and Y. We find it by looping
        // over all of them and checking to see if the position is 1 space away match.
        function adjacentSpaces(currentSpace) {
            return json.then(function(data) {
                var list = [];
                data.forEach(function(boardSpace) {
                    if (spaceAdjacent(currentSpace, boardSpace)){
                        list.push(new BoardSpace(boardSpace));
                    }
                });
                return list;
            })
        }

        function spaceAbove(currentSpace){
            return json.then(function(data) {
                data.forEach(function(boardSpace) {
                    if (topAdjacent(currentSpace, boardSpace)){
                        return true;
                    }
                });
                return false;
            })
        }
        function spaceLeft(currentSpace){
            return json.then(function(data) {
                data.forEach(function(boardSpace) {
                    if (leftAdjacent(currentSpace, boardSpace)){
                        return true;
                    }
                });
                return false;
            })
        }
        function topAdjacent(currentSpace, boardSpace){
            return (boardSpace.yBoardPosition == currentSpace.yBoardPosition - 1) && boardSpace.xBoardPosition == currentSpace.xBoardPosition;
        }
        function leftAdjacent(currentSpace, boardSpace){
            return (boardSpace.xBoardPosition == currentSpace.xBoardPosition - 1) && boardSpace.yBoardPosition == currentSpace.yBoardPosition;
        }

        function spaceAdjacent(currentSpace, boardSpace){
            return verticallyAdjacent(currentSpace, boardSpace) || horizontallyAdjacent(currentSpace, boardSpace);
        }

        function verticallyAdjacent(currentSpace, boardSpace){
            return (boardSpace.yBoardPosition == currentSpace.yBoardPosition - 1 || boardSpace.yBoardPosition == currentSpace.yBoardPosition + 1) && boardSpace.xBoardPosition == currentSpace.xBoardPosition;
        }
        function horizontallyAdjacent(currentSpace, boardSpace){
            return (boardSpace.xBoardPosition == currentSpace.xBoardPosition - 1 || boardSpace.xBoardPosition == currentSpace.xBoardPosition + 1) && boardSpace.yBoardPosition == currentSpace.yBoardPosition
        }

        // Finally, the factory itself returns the entire
        // Project constructor (which has `query` and `get` attached).
        return BoardSpace;
    }
})();