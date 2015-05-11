angular.module('app').factory('Question', function(){
  /*
   * Question Class
   */
  function Question(data){
    this.id = data.id;
    this.text = data.text || "";
    this.answer = data.answer || "";
    this.categoryId = data.categoryId || 1;
  }

  return Question;
})
