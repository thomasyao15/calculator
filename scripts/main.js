
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberClick)
})

function handleNumberClick(e) {
    const mainBuffer = document.getElementById('main-buffer');
    mainBuffer.textContent += e.target.textContent;
}

