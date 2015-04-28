angular.module('app').factory('Player', function(){
  /*
   * Player Class
   */
  function Player(name){
    this.name = name;
  }

  Player.prototype.updateLocation = function(){

  };

  Player.prototype.collectCategory = function(categoryId){

  };

  return Player;
})
