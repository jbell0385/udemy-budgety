//Budget controller
var budgetController = (function() {

  //some code

})();


//UI Controller
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    getDOMStrings: function() {
      return DOMstrings;
    }
  }
})();


//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

  var DOM = UICtrl.getDOMStrings();
  var ctrlAddItem = function() {
    //1. Get the field input data
    var input = UICtrl.getinput();
    console.log(input);
    //2. Add the item to the budget controller

    //3. Add the new item to the UI

    //4. Calculate the budget

    //5. Display the budget on the UI
  }

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  // Check to see if user presses the enter button.
  document.addEventListener('keypress', function(event) {
    if (event.which === 13 || event.keyCode === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
