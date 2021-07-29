
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorClick)
})

document.getElementById("equals").addEventListener("click", handleEqualsClick)

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
    const mainBuffer = document.getElementById('main-buffer');
    const secondaryBuffer = document.getElementById("secondary-buffer");
    const clickedOperator = e.target.id.toUpperCase();


    if (currentOperator != operators.NONE) {
        console.log("Current operator not none - FIXME call equals button automatically");
        return;
    }

    console.log("Adding clicked operator to currentOp");
    currentOperator = operators[clickedOperator];
    num1 = parseFloat(mainBuffer.textContent);
    secondaryBuffer.textContent = mainBuffer.textContent + " " + e.target.textContent;
    mainBuffer.textContent = '0';
}

function handleEqualsClick(e) {
    const mainBuffer = document.getElementById('main-buffer');
    const secondaryBuffer = document.getElementById("secondary-buffer");

    if (currentOperator == operators.NONE) {
        console.log("No selected current operator");
        return;
    }

    num2 = parseFloat(mainBuffer.textContent);
    // secondaryBuffer.textContent = secondaryBuffer.textContent + " " + mainBuffer.textContent + " =";
    secondaryBuffer.textContent = "";  // alternative method
    mainBuffer.textContent = operate();
}

function operate() {
    let answer;

    switch (currentOperator) {
        case operators.PLUS:
            answer = num1 + num2;
            break;
        case operators.MINUS:
            answer = num1 - num2;
            break;
        case operators.MULTIPLY:
            answer = num1 * num2;
            break;
        case operators.DIVIDE:
            answer = num1 / num2;
            break;
        default:
            console.log("ERROR in operate function");
            break;
    }

    return answer;
}

const operators = {
    PLUS: "plus",
    MINUS: "minus",
    MULTIPLY: "multiply",
    DIVIDE: "divide",
    NONE: "none",
}

let currentOperator = operators.NONE;
let num1;  // first number or number in secondary buffer
let num2;