const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        this.delete()
    };
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    };
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    };
    
    // append each number in display screen
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    };
    //choose operation using
    chooseOperation(operation) {
        if(this.currentOperand == '') return 
          
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    };
    // computing or calculating the entered number
    compute() {
        let computation
        const previ = parseFloat(this.previousOperand);
        const currt = parseFloat(this.currentOperand);
        if(isNaN(previ) || isNaN(currt)) return
        switch (this.operation) {
            case '+':
                computation = previ + currt
                break
            case '-':
                computation = previ - currt
                break

            case '*':
                computation = previ * currt
                break

            case '÷':
                computation = previ / currt
                break
            default:
                return
        };
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    };
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = '0'
        } else {
          //no decimal number
            integerDisplay = integerDigits.toLocaleString('en', {
             maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    };
    
    //updating the entre numb
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText =''
        }
    

    };
};


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

 // add event listener to delete keys
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay();
});

//applying for each number's button
numberButtons.forEach((button) => {
    // add event listener to number's keys
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
    
        //updating each number clicked to be displayed 
        calculator.updateDisplay();

    });
    
    // // add event listener to operations' keys
    button.addEventListener('click', () => {
        //updating each operation clicked to be displayed 
        calculator.updateDisplay();

    });

    // add event listener to equals' keys
    equalsButton.addEventListener('click',  button => {
         calculator.compute();
         calculator.updateDisplay();
    });

    // add event listener to clear all(CA) keys
    allClearButton.addEventListener('click', button => {
        calculator.clear();
        calculator.updateDisplay();
    });

   

    operationButtons.forEach((button)=> {
            // // add event listener to operations' keys
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)

        //updating each operation clicked to be displayed 
        calculator.updateDisplay();

    });
    })
});

