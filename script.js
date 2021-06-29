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
            case "=":
                this.calc();
                return;
        }
        if(this.currentNum === '')return;
        if(this.previousNum !== ''){
            this.calc();
        }
        this.operation = id;
        this.previousNum = this.currentNum;
        this.currentNum = '';
    }
    calc(){
        let comp;
        const prev = parseFloat(this.previousNum);
        const curr = parseFloat(this.currentNum);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                comp = prev + curr;
                break;
            case '-':
                comp = prev - curr;
                break;
            case '∗':
                comp = prev * curr;
                break;
            case '÷':
                comp = prev / curr;
                break;
        
            default:
                break;
        }
        this.currentNum = comp;
    }
    update(){
        this.currentDisplay.innerText = 
            this.currentNum;
        this.previousDisplay.innerText = 
            this.previousNum;
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