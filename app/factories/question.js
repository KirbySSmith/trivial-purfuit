angular.module('app').factory('Question', function(){
  /*
   * Question Class
   */
  function Question(text, answer, categoryId){
    this.text = text;
    this.answer = answer;
    this.categoryId = categoryId;
  }

  return Question;
})
