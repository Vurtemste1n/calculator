class calculator {
  constructor(upperDisplay, downDisplay) {
    this.upperDisplay = upperDisplay;
    this.downDisplay = downDisplay;
    this.allClear();
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  allClear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.downDisplay.textContent = this.currentOperand;
    if (this.operation !== null && this.operation !== undefined) {
      this.upperDisplay.textContent = `${this.previousOperand}${this.operation}`;
    } else {
      this.upperDisplay.textContent = this.previousOperand;
    }
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.previousOperand != "") {
      newCalculator.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let result;
    let number1 = Number(this.previousOperand);
    let number2 = Number(this.currentOperand);
    switch (this.operation) {
      case "+":
        result = number1 + number2;
        break;
      case "-":
        result = number1 - number2;
        break;
      case "/":
        if (number2 === 0) {
          result = "ERROR!";
          break;
        }
        result = number1 / number2;

        break;
      case "*":
        result = number1 * number2;
        break;
    }
    this.currentOperand = result;
    this.previousOperand = "";
    this.operation = undefined;
  }
}

const number = document.querySelectorAll(".number");
const downDisplay = document.querySelector("#down-display");
const upperDisplay = document.querySelector("#upper-display");
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let newCalculator = new calculator(upperDisplay, downDisplay);
number.forEach((element) => {
  element.addEventListener("click", () => {
    newCalculator.appendNumber(element.textContent);
    newCalculator.updateDisplay();
  });
});
clearButton.addEventListener("click", () => {
  newCalculator.allClear();
  newCalculator.updateDisplay();
});
operators.forEach((element) => {
  element.addEventListener("click", () => {
    newCalculator.chooseOperation(element.textContent);
    newCalculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", () => {
  newCalculator.compute();
  newCalculator.updateDisplay();
});
