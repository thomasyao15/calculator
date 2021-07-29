
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick);
});

function handleNumberClick(e) {
    const mainBuffer = document.getElementById('main-buffer');
    currentBufferContent = mainBuffer.textContent;
    clickedNumber = e.target.textContent;

    const amountOfCommas = currentBufferContent.split('.').length - 1;
    if (clickedNumber == '.' && amountOfCommas > 0) {
        return;
    }

    // Chop off leading 0
    if (currentBufferContent.charAt(0) == '0') {
        currentBufferContent = currentBufferContent.substring(1);
    }

    mainBuffer.textContent = currentBufferContent + clickedNumber;
}

