const buttons = 
    document.getElementById(
        "calculator").getElementsByTagName("div");
const previous = document.getElementById("previous");
const current = document.getElementById("current");

class Calculator {
    constructor(currentElement,previousElement){
        this.currentDisplay = currentElement;
        this.previousDisplay = previousElement;
        this.clear();
    }
    clear () {
        for (const btn of buttons) {
            btn.classList.remove('op');
        }
        this.currentNum = '';
        this.previousNum = '';
        this.operation = undefined;
    }
    delete() {
        this.currentNum = this.currentNum.substr(
            0,this.currentNum.length - 1
        );
    }
    appendNum(id){
        if(id === '.' && this.currentNum.includes('.'))
            return;
        this.currentNum += id;
    }
    chooseOp(id){
        switch (id) {
            case "A/C":
                this.clear();
                return;
            case "⇐":
                this.delete();
                return;
        }
        if(this.currentNum === ''){
            if(id !== '=') this.operation = id;
            return;
        }
        this.calc();
        if(id !== '=') {
            this.currentNum = '';
            this.operation = id;
        }
    }
    calc(){
        let comp = 0.0;
        var curr = parseFloat(this.currentNum);
        var prev = parseFloat(this.previousNum);
        switch (this.operation) {
            case '+':
                curr = prev + curr;
                break;
            case '-':
                curr = prev - curr;
                break;
            case '∗':
                curr = prev * curr;
                break;
            case '÷':
                curr = prev / curr;
                break;
        }
        this.previousNum = curr;
    }
    formatNum(num){
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split('.'));
        const deciDigits = strNum.split('.')[1];
        let intDisplay;
        if(isNaN(intDigits)){
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString(
                'en', {maximumFractionDigits: 0}
            )
        }
        if (deciDigits != null){
            return intDisplay + '.' + deciDigits;
        }
        return intDisplay;
    }
    update(){
        this.currentDisplay.innerText = 
            this.formatNum(this.currentNum);
        this.previousDisplay.innerText = 
            this.formatNum(this.previousNum);
    }
}

function highlight(button) {
    switch (button.innerText) {
        case '+':
        case '-':
        case '∗':
        case '÷':
            for (const id of buttons) {
                id.classList.remove('op');
            }
            button.classList.add("op");
        default:
            break;
    }
}

current.value = '';
const calculator = new Calculator(current,previous);

for (let button of buttons){
    button.style.gridArea = button.id;
    if (button.classList.contains("func"))
        button.addEventListener("click",
            function(){
                highlight(button);
                calculator.chooseOp(button.innerText);
                calculator.update();
            });
    else
        button.addEventListener("click",
            function(){
                calculator.appendNum(button.innerText);
                calculator.update();
            });
    
}