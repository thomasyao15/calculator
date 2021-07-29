
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorClick)
})

function handleNumberClick(e) {
    const mainBuffer = document.getElementById('main-buffer');
    currentBufferContent = mainBuffer.textContent;
    clickedNumber = e.target.textContent;

    const amountOfCommas = currentBufferContent.split('.').length - 1;
    if (clickedNumber == '.' && amountOfCommas > 0) {
        console.log("Already 1 comma in number");
        return;
    }

    // Chop off leading 0
    if (currentBufferContent.charAt(0) == '0') {
        currentBufferContent = currentBufferContent.substring(1);
    }

    mainBuffer.textContent = currentBufferContent + clickedNumber;
}

function handleOperatorClick(e) {
    const clickedOperator = e.target.id.toUpperCase();

    if (currentOperator != operators.NONE) {
        console.log("Current operator not none");
        return;
    }
    else {
        console.log("Adding clicked operator to currentOp");
        currentOperator = operators[clickedOperator];
    }
}

const operators = {
    PLUS: "plus",
    MINUS: "minus",
    MULTIPLY: "multiply",
    DIVIDE: "divide",
    NONE: "none",
}

let currentOperator = operators.NONE;