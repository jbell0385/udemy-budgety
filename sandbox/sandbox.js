var budgetController = (function() {
  //Receive DOM values from UI controller

  //Add/subtract to the total

  //Return public methods and values


})();

var UIController = (function() {
  //create dom variables
  var DOMstrings = {
    addSubtract: ".addSubtract",
    inp_comment: "#inp_comment",
    inp_value: "#inp_value"
  }

  //Receive values from budget Controller

  //Update values and totals

  //add entry to dom

  //clear input fields

  //return public values and methods
  return {
    DOMstrings:function(){
      return DOMstrings;
    }
  }


})();

var controller = (function(budgetCtrl, UICtrl) {
  //
  var DOM = UICtrl.DOMstrings();

  var addSubtract = document.querySelector(DOM.addSubtract).value;

  return{
    addSubtract:addSubtract
  }
})(budgetController, UIController);
