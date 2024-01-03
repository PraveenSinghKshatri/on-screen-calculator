document.addEventListener('DOMContentLoaded', function () {
    const expressionElement = document.getElementById('expression');
    const resultElement = document.getElementById('result');
    let expression = '';

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    function updateDisplay() {
        expressionElement.textContent = expression;
    }

    function clearDisplay() {
        expression = '';
        updateDisplay();
    }

    function appendCharacter(char) {
        expression += char;
        updateDisplay();
    }

    function addDecimal() {
        if (!expression.includes('.')) {
            expression += '.';
            updateDisplay();
        }
    }

    function setOperator(operator) {
        if (expression !== '' && !isNaN(expression[expression.length - 1])) {
            expression += operator;
            updateDisplay();
        }
    }

    function calculate() {
        try {
            const result = eval(expression);
            resultElement.textContent = result;
        } catch (error) {
            resultElement.textContent = 'Error';
        }
    }

    function handleKeyboardInput(event) {
        const key = event.key;
        const keyCode = event.keyCode;

        if (!isNaN(parseFloat(key)) || key === '0') {
            appendCharacter(key);
        } else if (key === '.') {
            addDecimal();
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clearDisplay();
            resultElement.textContent = '';
        } else if (key === '%') {
            setOperator('%');
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperator(key);
        } else if (keyCode === 8) {
            // Backspace key
            expression = expression.slice(0, -1);
            updateDisplay();
        }
    }

    document.getElementById('dark-mode-btn').addEventListener('click', toggleDarkMode);

    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', function () {
            const buttonValue = this.textContent.trim();

            if (!isNaN(parseFloat(buttonValue)) || buttonValue === '0') {
                appendCharacter(buttonValue);
            } else if (buttonValue === '.') {
                addDecimal();
            } else if (buttonValue === 'C') {
                clearDisplay();
                resultElement.textContent = '';
            } else if (buttonValue === '=') {
                calculate();
            } else {
                setOperator(buttonValue);
            }
        });
    });

    document.addEventListener('keydown', handleKeyboardInput);
});
