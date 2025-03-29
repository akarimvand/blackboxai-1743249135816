let currentInput = '0';
let previousInput = '';
let operation = undefined;
let resetScreen = false;

const resultDisplay = document.getElementById('result');

function updateDisplay() {
    resultDisplay.value = currentInput;
}

function append(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = undefined;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    resetScreen = true;
}

function calculate() {
    if (operation === undefined || currentInput === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        currentInput = 'خطا: ورودی نامعتبر';
        updateDisplay();
        return;
    }
    
    let result;
    try {
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    currentInput = 'خطا: تقسیم بر صفر';
                    updateDisplay();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        // Round to 10 decimal places to avoid floating point precision issues
        result = Math.round(result * 10000000000) / 10000000000;
        
        currentInput = result.toString();
        operation = undefined;
        previousInput = '';
        resetScreen = true;
        updateDisplay();
        
    } catch (error) {
        currentInput = 'خطا در محاسبه';
        updateDisplay();
    }

}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        append(event.key);
    } else if (event.key === '.') {
        append('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperation(event.key);
    } else if (event.key === '%') {
        append('%');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

// Initialize calculator
updateDisplay();