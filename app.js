// Calculator functions (same logic as calculator.js)
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }
function percentage(a, b) { return (a / 100) * b; }
function ln(a) { return Math.log(a); }
function log10(a) { return Math.log10(a); }
function sin(a) { return Math.sin((a * Math.PI) / 180); }
function cos(a) { return Math.cos((a * Math.PI) / 180); }
function tan(a) { return Math.tan((a * Math.PI) / 180); }

// State: tracks what the user has entered
let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

// Grab references to the display elements
const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");

function updateDisplay() {
    resultDisplay.textContent = currentInput;
    expressionDisplay.textContent = previousInput + (operator ? " " + getOperatorSymbol(operator) : "");
}

function getOperatorSymbol(op) {
    const symbols = { add: "+", subtract: "\u2212", multiply: "\u00d7", divide: "\u00f7" };
    return symbols[op] || op;
}

// Handle number button clicks
function handleNumber(value) {
    if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === "0" ? value : currentInput + value;
    }
    updateDisplay();
}

// Handle operator button clicks (+, -, ×, ÷)
function handleOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

// Handle equals
function calculate() {
    if (!operator || !previousInput) return;

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "add": result = add(a, b); break;
        case "subtract": result = subtract(a, b); break;
        case "multiply": result = multiply(a, b); break;
        case "divide": result = divide(a, b); break;
    }

    expressionDisplay.textContent = previousInput + " " + getOperatorSymbol(operator) + " " + currentInput + " =";
    currentInput = String(parseFloat(result.toFixed(10)));
    previousInput = "";
    operator = null;
    shouldResetDisplay = true;
    resultDisplay.textContent = currentInput;
}

// Handle scientific functions (single-input operations)
function handleScientific(action) {
    const num = parseFloat(currentInput);
    let result;

    switch (action) {
        case "sin": result = sin(num); break;
        case "cos": result = cos(num); break;
        case "tan": result = tan(num); break;
        case "ln": result = ln(num); break;
        case "log10": result = log10(num); break;
    }

    expressionDisplay.textContent = action + "(" + currentInput + (action === "sin" || action === "cos" || action === "tan" ? "\u00b0" : "") + ") =";
    currentInput = String(parseFloat(result.toFixed(10)));
    shouldResetDisplay = true;
    resultDisplay.textContent = currentInput;
}

// Handle percentage: calculates percentage of previous number
function handlePercentage() {
    if (previousInput && operator) {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        currentInput = String(percentage(b, a));
    } else {
        currentInput = String(parseFloat(currentInput) / 100);
    }
    updateDisplay();
}

// Wire up all button clicks
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            handleNumber(value);
        } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
            handleOperator(action);
        } else if (action === "equals") {
            calculate();
        } else if (["sin", "cos", "tan", "ln", "log10"].includes(action)) {
            handleScientific(action);
        } else if (action === "percentage") {
            handlePercentage();
        } else if (action === "clear") {
            currentInput = "0";
            previousInput = "";
            operator = null;
            shouldResetDisplay = false;
            updateDisplay();
        } else if (action === "backspace") {
            currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
            updateDisplay();
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9" || e.key === ".") {
        handleNumber(e.key);
    } else if (e.key === "+") {
        handleOperator("add");
    } else if (e.key === "-") {
        handleOperator("subtract");
    } else if (e.key === "*") {
        handleOperator("multiply");
    } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("divide");
    } else if (e.key === "Enter" || e.key === "=") {
        calculate();
    } else if (e.key === "Backspace") {
        currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
        updateDisplay();
    } else if (e.key === "Escape") {
        currentInput = "0";
        previousInput = "";
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
    } else if (e.key === "%") {
        handlePercentage();
    }
});
