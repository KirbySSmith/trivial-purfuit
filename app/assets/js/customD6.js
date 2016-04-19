// Below is the high level dice roller code, which is much simpler
// to use than all the low level stuff above. Of course, using
// the low level stuff gives you a lot more flexibility in what
// you do, but the following D6 class will still allow you
// to do quite a lot.

function CustomD6() {}

CustomD6.dice = function(numDice, callback, callbackData, useImages, buttonLabel) {
  if (typeof useImages == "undefined") useImages = true;
  if (!buttonLabel) buttonLabel = "Roll Dice";
  if (!numDice) numDice = 1;
  if (numDice < 1) numDice = 1;
  CustomD6.numDice = numDice;
  CustomD6.numDiceShown = numDice;
  var results = new Array();
  var i;
  for (i=0; i<numDice; ++i) {
    results[i] = 0;
  }
  var builder = new D6AnimBuilder("dice", results, null, CustomD6.baseUrl, numDice, 50, useImages);
  CustomD6.builder = builder;
  var layout = [1];
  if (!callback) callback= D6Sample.noop;
  if (!callbackData) callbackData = null;
  var middleManData = {
    "id" : "dice",
    "callback" : callback,
    "callbackData" : callbackData
  };
  builder.layout = layout;
  builder.callback = CustomD6.middleManCallback;
  builder.callbackData = middleManData;
};

CustomD6.roll = function() {
  D6AnimBuilder.get("dice").reset();
  D6AnimBuilder.get("dice").start();
};

CustomD6.baseUrl = "";

CustomD6.setBaseUrl = function(baseUrl) {
  CustomD6.baseUrl = baseUrl;
};

CustomD6.middleManCallback = function(middleManData) {
  var callback = middleManData.callback;
  if (typeof callback != "function") {
    return;
  }
  var id = middleManData.id;
  var callbackData = middleManData.callbackData;
  var animBuilder = D6AnimBuilder.animBuilders[id];
  var results = animBuilder.results;
  var resultsTotal = 0;
  var i;
  for (i=0; i<CustomD6.numDiceShown; ++i) {
    resultsTotal += results[i];
  }
  callback(resultsTotal, callbackData, results);
} ;

