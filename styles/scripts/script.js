const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator
    
    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit
        calculator.waitingForSecondOperand = false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
    
    console.log(calculator)
}

function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false
        return
    }
    
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue)
    
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator
        
        console.log(calculator)
        return
    }
    
    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if(operator) {
        const result = calculate(firstOperand, inputValue, operator)
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result
    }
    
    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator
    console.log(calculator)
}

function calculate(firstOperand, secondOperand, operator) {
    if(operator === '+') {
        return firstOperand + secondOperand
    } else if(operator === '-') {
        return firstOperand - secondOperand
    } else if(operator === '*') {
        return firstOperand * secondOperand
    } else if(operator === '/') {
        return firstOperand / secondOperand
    }
    
    return secondOperand
}

function resetCalculator() {
    calculator.displayValue = '0'
    calculator.firstOperand = null
    calculator.waitingForSecondOperand = false
    calculator.operator = null
    console.log(calculator)
}

function updateDisplay() {
    const display = document.getElementById('screen-two')
    display.textContent = calculator.displayValue
}

updateDisplay()

const keys = document.getElementsByClassName('grid-btn')

for(let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', (event) => {
        const { target } = event
        const { value } = target
        if(!target.matches('button')) {
            return;
        }
        
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value)
                break
            case '.':
                inputDecimal(value)
                break
            case 'clear':
                resetCalculator()
                break
            case 'reset':
                resetCalculator()
                break
            default:
                if(Number.isInteger(parseFloat(value))) {
                    inputDigit(value)
                }
        }
        
        updateDisplay()
    })
}


// Toggle switch 
let buttons = document.getElementsByClassName("t-btns")
let arr = [...buttons]

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1"
    
    arr
      .filter(function (item) {
        return item != element
    })
      .forEach((item) => {
        item.style.opacity = "0"
    })
  })
})