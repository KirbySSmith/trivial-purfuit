angular.module('app').factory('BoardSpace', function(){
  /*
   * BoardSpace Class
   */
  function BoardSpace(categoryId, yBoardPosition, xBoardPosition, isSpokeSpace, isCenterSpace, isRollAgain, nextSpaces, previousSpaces){
    this.categoryId = categoryId;
    this.yBoardPosition = yBoardPosition;
    this.xBoardPosition = xBoardPosition;
    this.isSpokeSpace = isSpokeSpace;
    this.isCenterSpace = isCenterSpace;
    this.isRollAgain = isRollAgain;
    this.nextSpaces = nextSpaces;
    this.previousSpaces = previousSpaces;
  }

  return BoardSpace;
});
