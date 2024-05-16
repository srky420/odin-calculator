// Variables
let num1 = null;
let num2 = null;
let result = null;
let op = '';

// Get all calculator buttons
const buttons = document.querySelectorAll('.calculator .buttons button');

// Get result div
const immediateInput = document.querySelector('#immediate-input');
const expression = document.querySelector('#expression');

// Add event listener to buttons
buttons.forEach(btn => btn.addEventListener('click', (e) => {

    // Get pressed button
    const pressedBtn = e.currentTarget;

    // Get the key pressed
    const key = pressedBtn.textContent;

    // Operator input
    if (['+', '-', '*', '/', '='].includes(key)) {

        // Restrictions
        if (expression.textContent[expression.textContent.length - 1] === '=' && key === '=') {
            return
        }
        if (['+', '-', '*', '/'].includes(expression.textContent[expression.textContent.length - 1])) {
            return;
        }

        // Initial input
        if (num1 === null) {
            num1 = immediateInput.textContent;
            op = key;
            immediateInput.textContent = '';
            expression.textContent += key;
        }
        // On result
        else if (op === '') {
            op = key;
            immediateInput.textContent = '';
            expression.textContent = '';
            expression.textContent += num1;
            expression.textContent += key;
        }
        // Num1 and op already set, calculate result
        else {
            num2 = immediateInput.textContent;
            result = operate(num1, num2, op);
            op = key === '=' ? '' : key;
            num1 = result;
            num2 = null;
            immediateInput.textContent = result;
            expression.textContent += key;
        }
    }
    // Number/Decimal input
    else {
        // Restriction
        if (key === '.' && /\./g.test(immediateInput.textContent)) {
            if (result === null) {
                return;
            }
        }
        // New calculation
        if (result !== null && op === '') {
            clearVars();
            immediateInput.textContent = '';
        }
        else if (result !== null) {
            result = null;
            immediateInput.textContent = '';
        }
        // Remove initial zero
        if (immediateInput.textContent == '0') {
            immediateInput.textContent = '';
            expression.textContent = '';
        }
        // Decimal input
        if (key === '.') {
            expression.textContent += immediateInput.textContent === '' ? `0${key}` : key;
            immediateInput.textContent += immediateInput.textContent === '' ? `0${key}` : key;
        }
        else {
            // Append number to input displays
            immediateInput.textContent += key;
            expression.textContent += key;
        }
    }

    console.log('Num1: ' + num1, 'Num2: ' + num2, 'Op: ' + op, 'Result: ', + result);
}));

// Clear screen button
document.querySelector('#clear-screen').addEventListener('click', clearVars);

// Performs requested operation on two numbers
function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    let out = 0;
    switch (op) {
        case '+':
            out = a + b;
            break;
        case '-':
            out = a - b;
            break;
        case '*':
            out = a * b;
            break;
        case '/':
            out = a / b;
            break;
    }
    return out;
}

// Clears all variables
function clearVars() {
    immediateInput.textContent = 0;
    expression.textContent = '';
    num1 = num2 = result = null;
    op = '';
}
