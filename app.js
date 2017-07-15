  //Budget controller
  var budgetController = (function() {

    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
        sum += cur.value;
      });
      data.totals[type] = sum;
    }

    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1
    }

    return {
      addItem: function(type, des, val) {
        var newItem, ID;

        // create new ID
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }

        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
          newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
          newItem = new Income(ID, des, val);
        }

        //Push it into our data structure
        data.allItems[type].push(newItem);

        //return
        return newItem;

      },

      calculateBudget: function() {
        //calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');

        //calculate the budget: income - expenses
        data.budget = data.totals.inc - data.totals.exp;
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

        //calculate the percentage of income that we spent

      },

      getBudget: function() {
        return {
          budget: data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage: data.percentage
        }
      },

      testing: function() {
        console.log(data);
      }

    }

  })();


  //UI Controller
  var UIController = (function() {

    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list'
    }

    return {
      getinput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
        }
      },
      addListItem: function(obj, type) {
        var html, newHtml, element;

        //Create HTML string with placeholder text
        if (type === 'inc' && document.querySelector(DOMstrings.inputType).value !== "" && document.querySelector(DOMstrings.inputValue).value !== "") {
          //The DOM element where we're going to append a new income element
          element = DOMstrings.incomeContainer;
          //The HTML structure of the new income element
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        } else if (type === 'exp' && document.querySelector(DOMstrings.inputType).value !== "" && document.querySelector(DOMstrings.inputValue).value !== "") {
          //The DOM element where we're going to append a new expense element
          element = DOMstrings.expensesContainer;
          //The HTML structure of the new expense element
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //Replace the placeholder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        //Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

<<<<<<< HEAD
        //Clear the input fields
        document.querySelector(DOMstrings.inputDescription).value = "";
        document.querySelector(DOMstrings.inputValue).value = "";

=======
      },

      clearFields: function() {
        var fields;
        fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
        var fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
        });
        fieldsArr[0].focus();
>>>>>>> origin/master
      },

      getDOMStrings: function() {
        return DOMstrings;
      }

    }
  })();


  //Global App Controller
  var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
      var DOM = UICtrl.getDOMStrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      // Check to see if user presses the enter button.
      document.addEventListener('keypress', function(event) {
        if (event.which === 13 || event.keyCode === 13) {
          ctrlAddItem();
        }
      });
    };

    var updateBudget = function() {
      //1. Calculate the budget
      budgetCtrl.calculateBudget();

      //2. return the budget
      var budget = budgetCtrl.getBudget();

      //3. Display the budget on the UI
      console.log(budget);
    }

    var ctrlAddItem = function() {
      var input, newItem;

      //1. Get the field input data
      input = UICtrl.getinput();

      if (input.description !== "" && !(isNaN(input.value)) && input.value > 0) {
        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

<<<<<<< HEAD
      //3. Add the new item to the UI
      UICtrl.addListItem(newItem, input.type);
      //4. Calculate the budget
=======
        //3. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);

        //4. Clear the fields
        UICtrl.clearFields();

        //5.Calculate and update budget
        updateBudget();
      }
>>>>>>> origin/master

    }
    return {
      init: function() {
        setupEventListeners();
      }
    }

  })(budgetController, UIController);

  controller.init();
