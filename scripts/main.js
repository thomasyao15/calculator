const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorClick)
})

document.getElementById("equals").addEventListener("click", handleEqualsClick)


function updateBuffer(buffer, text) {
    const mainBuffer = document.getElementById('main-buffer');
    const secondaryBuffer = document.getElementById("secondary-buffer");

    switch (buffer) {
        case "main":
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

function handleNumberClick(e) {
    currentBufferContent = getBuffer('main');
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

    updateBuffer('main', currentBufferContent + clickedNumber)
}

function handleOperatorClick(e) {
    const clickedOperator = e.target.id.toUpperCase();
    const operatorString = e.target.textContent;

    if (currentOperator != operators.NONE) {
        console.log("Current operator not none - FIXME call equals button automatically");
        return;
    }

    currentOperator = operators[clickedOperator];
    num1 = parseFloat(getBuffer('main'));
    updateBuffer('secondary', getBuffer('main') + " " + operatorString);
    updateBuffer('main', '0');
}

function handleEqualsClick(e) {
    if (currentOperator == operators.NONE) {
        console.log("No selected current operator");
        return;
    }

    num2 = parseFloat(getBuffer('main'));
    updateBuffer('main', operate());
    updateBuffer('secondary', "");
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
let num1;  // store first number / number in secondary buffer
let num2;  // store second number to calculate