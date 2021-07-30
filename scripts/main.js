
const operators = {
    PLUS: "plus",
    MINUS: "minus",
    MULTIPLY: "multiply",
    DIVIDE: "divide",
    NONE: "none",
}

let currentOperator = operators.NONE;
let num1;  // store first number / number in secondary buffer
let num2;  // store second number to calculate


const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorClick)
})

document.getElementById("equals").addEventListener("click", handleEqualsClick);
document.getElementById("delete").addEventListener("click", handleDeleteClick);
document.getElementById("clear").addEventListener("click", handleClearClick);


// Main buffer is the main h1 line on the calc screen - stores current number
// Secondary buffer is smaller h3 line on top of main buffer - stores previous number

function handleNumberClick(e) {
    currentBufferContent = getBuffer('main');
    clickedNumber = e.target.textContent;

    const amountOfDecimals = currentBufferContent.split('.').length - 1;
    if (clickedNumber == '.' && amountOfDecimals > 0) {
        return;
    }

    // Chop off leading 0
    if (currentBufferContent.charAt(0) == '0') {
        currentBufferContent = currentBufferContent.substring(1);
    }

    updateBuffer('main', currentBufferContent + clickedNumber)
}

function handleOperatorClick(e) {
    const clickedOperator = e.target.id.toUpperCase();
    const operatorString = e.target.textContent;

    if (currentOperator != operators.NONE) {
        handleEqualsClick();  // automatically call equals func to allow stringing of operators
        handleOperatorClick(e);  // after equals is processed, run this func again now that operators has ben reset to none
        return;
    }

    currentOperator = operators[clickedOperator];
    num1 = parseFloat(getBuffer('main'));  // store main buffer number in num1 var
    updateBuffer('secondary', getBuffer('main') + " " + operatorString);
    updateBuffer('main', '0');
}

function handleEqualsClick() {
    if (currentOperator == operators.NONE) {
        return;
    }

    num2 = parseFloat(getBuffer('main'));

    answer = operate();
    if (!isFinite(num1) || !isFinite(num2) || !isFinite(answer)) {
        alert("An illegal calculation occurred, please try again.")
        handleClearClick();
        return;
    }

    updateBuffer('main', answer);
    updateBuffer('secondary', "");
    currentOperator = operators.NONE;  // reset current operator
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
    }

    return answer;
}

function handleDeleteClick() {
    mainBuffer = getBuffer('main');

    if (mainBuffer.length <= 1) {
        updateBuffer('main', '0');
    }
    else {
        updateBuffer('main', mainBuffer.substring(0, mainBuffer.length - 1));
    }
}

function handleClearClick() {
    updateBuffer('main', "0");
    updateBuffer("secondary", "");
    currentOperator = operators.NONE;
}

function updateBuffer(buffer, text) {
    const mainBuffer = document.getElementById('main-buffer');
    const secondaryBuffer = document.getElementById("secondary-buffer");

    switch (buffer) {
        case "main":
            // fix decimal rounding to 5 decimals if it is a float
            if (typeof text == "number") {
                if (text.toString().includes(".")) {
                    text = text.toFixed(5);
                }
            }
            mainBuffer.textContent = text;
            break;
        case "secondary":
            secondaryBuffer.textContent = text;
            break;
        default:
            throw "No buffer specified";
    }
}

function getBuffer(buffer) {
    const mainBuffer = document.getElementById('main-buffer');
    const secondaryBuffer = document.getElementById("secondary-buffer");

    switch (buffer) {
        case "main":
            return mainBuffer.textContent;
        case "secondary":
            return secondaryBuffer.textContent;
        default:
            throw "No buffer specified";
    }
}
